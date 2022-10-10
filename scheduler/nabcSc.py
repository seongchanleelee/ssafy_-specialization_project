
from selenium.common.exceptions import NoSuchElementException
from selenium import webdriver
from selenium.webdriver.common.by import By
import re
import pandas as pd
import os
import sys
import urllib.request
import time
import datetime

# from multiprocessing import Pool 
# import multiprocessing



# start = time.time() 

def travel(word) :
    client_id = "lrocsZt4BsRz87jLa2UX"
    client_secret = "DpOj8gHFaO"


    quote = word  #검색어
    display_num = "100"     #최대갯수

    encText = urllib.parse.quote(quote)
    url = "https://openapi.naver.com/v1/search/blog?query=" + encText +"&display=" + display_num  +"&sort=date" # json 결과
    # url = "https://openapi.naver.com/v1/search/blog.xml?query=" + encText # xml 결과
    request = urllib.request.Request(url)
    request.add_header("X-Naver-Client-Id",client_id)
    request.add_header("X-Naver-Client-Secret",client_secret)
    response = urllib.request.urlopen(request)
    rescode = response.getcode()

    if(rescode==200):
        response_body = response.read()
    #     print(response_body.decode('utf-8'))
    else:
        print("Error Code:" + rescode)

    body = response_body.decode('utf-8')
    body = body.replace('"','')
    #body 나누기
    list1 = body.split('\n\t\t{\n\t\t\t')
    #naver블로그 글만 가져오기
    list1 = [i for i in list1 if 'naver' in i]
    
    #새글 없으면 넘어가기
    if len(list1) == 0 : return
    
    #오늘기준 7일전 구하기
    now = datetime.date.today()
    sevenday = int(now.strftime("%Y%m%d"))-7

    #블로그 제목, 링크 뽑기
    titles = []
    links = []
    for i in list1:
        date = re.findall('postdate:(.*?)\n\t\t',i)
        postdate = int(date[0])
        if postdate < sevenday : continue
        title = re.findall('title:(.*?),\n\t\t\tlink',i)
        link = re.findall('link:(.*?),\n\t\t\tdescription',i)
        titles.append(title)
        links.append(link)

    titles = [r for i in titles for r in i]
    links = [r for i in links for r in i]

    # print('<<제목 모음>>')
    # print(titles)
    # print('총 제목 수: ',len(titles),'개')#제목갯수확인
    # print('\n<<링크 모음>>')
    # print(links)
    # print('총 링크 수: ',len(links),'개')#링크갯수확인


    # 링크를 다듬기 (필요없는 부분 제거 및 수정)
    blog_links = []
    for i in links:
        a = i.replace('\\','')
        b = a.replace('?Redirect=Log&logNo=','/')
        if "https://blog.naver.com/" not in b:
            blog_links.append("https://blog.naver.com/")
            continue
        blog_links.append(b)

    # print(blog_links)
    # print('생성된 링크 갯수:',len(blog_links),'개')



    # 크롬 드라이버 설치
    # driver = webdriver.Chrome(ChromeDriverManager().install())
    # driver.implicitly_wait(3)

    options = webdriver.ChromeOptions()
    options.add_argument('--headless')
    options.add_argument('--no-sandbox')
    driver = webdriver.Chrome('/usr/bin/chromedriver', chrome_options=options) 
    driver.implicitly_wait(3)


    #블로그 링크 하나씩 불러서 크롤링
    contents = []
    for i in blog_links:
        #블로그 링크 하나씩 불러오기
        driver.get(i)
        time.sleep(1)
        #블로그 안 본문이 있는 iframe에 접근하기
        try :
            driver.switch_to.frame("mainFrame")
        except :
            contents.append(" ")
            continue
        #본문 내용 크롤링하기
        
        try:
            a = driver.find_element(By.CSS_SELECTOR,'div.se-main-container').text
            contents.append(a)
        # NoSuchElement 오류시 예외처리(구버전 블로그에 적용)
        except NoSuchElementException:
            a = driver.find_element(By.CSS_SELECTOR,'div#content-area').text
            contents.append(a)
        #print(본문: \n', a)



    driver.quit() #창닫기
    # print("<< 본문 크롤링 완료 >>")


    #제목, 블로그링크, 본문내용 Dataframe으로 만들기
    df = pd.DataFrame({'관광지':quote, '제목':titles, '링크':blog_links,'내용':contents})

    #df 저장
    df.to_csv('/home/ubuntu/scheduler/data/{}_블로그.csv'.format(quote),encoding='utf-8-sig',index=False)
    # print("<< 저장완료 >>")

    # print("time :", time.time() - start)
    
    

    
