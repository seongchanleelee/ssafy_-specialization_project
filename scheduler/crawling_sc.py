import nabcSc
import time
from multiprocessing import Pool
import pandas as pd
import numpy as np
import os

# 10개 기준 약 12분
# 100개 기준 약 2시간 덜 걸림
# 300개 기준 약 6시간 덜 걸림
# 9810 - 11773
start_num = 1        #관광지 시작 번호 - 끝번호 그대로 넣고 시작
last_num = 11773        #관광지 끝 번호 

start_time = time.time()

#df = pd.read_csv("관광지목록.csv", encoding='utf-8')
df = pd.read_csv("/home/ubuntu/scheduler/관광지목록.CSV",encoding='utf-8')
word_origin = df['명칭'].values.tolist()
word = word_origin[start_num:last_num]
#print(word)

start_time = time.time()
# print("시작")
pool = Pool(processes=8)
pool.map(nabcSc.travel, word) 

#print("[ %d ~ %d ]  # 종료 %s 초" %(start_num, last_num, (time.time() - start_time)))



# 파일들이 있는 폴더명으로 폴더내 파일 목록 확인
forders = os.listdir('/home/ubuntu/scheduler/data')
# print(forders)

df_all = pd.DataFrame()
for i in range(0,len(forders)):
    if forders[i].split('.')[1] == 'csv':
        file = '/home/ubuntu/scheduler/data/'+forders[i]
        df= pd.read_csv(file,encoding='utf-8')
        df_all = pd.concat([df_all, df])

#df_all
df_all.to_csv("/home/ubuntu/scheduler/pre/total.csv", index=False)



df = pd.read_csv('/home/ubuntu/scheduler/pre/total.csv', sep=',', encoding='utf-8')

df = df.replace(',', ' ', regex=True)
# df = df.replace('.', ' ', regex=True)
df = df.replace(';', ' ', regex=True)
df = df.replace('\n', ' ', regex=True)

# df = df.replace(r'"', '', regex=True)
# df = df.replace(r'!"', '', regex=True)
# df = df.replace(r'."', '', regex=True)

# df = df.replace(to_replace='.', value='')
# df = df.replace('(.*)<b>(.*)', ' ', regex=True)
# df = df.replace(to_replace='<b>', value=' ', regex=True)
# df = df.replace(to_replace='<\/b>', value=' ')
df = df.drop('제목', axis=1)
df = df.drop('링크', axis=1)

# df
# df.tail(10)
df.to_csv('/home/ubuntu/scheduler/pre/total2.csv', sep=',',index=False)



# 250000 으로 자름
# df = pd.read_csv('eunji_001 - 복사본.csv', sep=',', encoding='utf-8')
df = pd.read_csv('/home/ubuntu/scheduler/pre/total2.csv', sep=',', encoding='utf-8')

# df
# df = df.astype({'place_no':'int'})
# df.dtypes
# df.head(10)
# print(df.count())
dflen = df['관광지'].count().astype(int)
# print(dflen)
# print(df['관광지'].size)
# print(df['내용'].size)
#df['내용'].argmax()
# df.dtypes


df.isnull().sum() #결측치 확인
df = df.fillna(" ") #결측치 채우기
# max(df['내용'][*],key=len)
max = 0
row = 0


# 25만자 넘는거 자르기
for i in range(dflen):
    temp = len(df['내용'][i])
    if temp > 300000 :
        df['내용'][i] = df['내용'][i][0:250000]

#가장긴 글 확인
for i in range(dflen):
    temp = len(df['내용'][i])
#     print(temp)
    if max < temp :
        max = temp
        row = i


# print(max)
# print(row)
#df.head()


# df.tail(10)
df.to_csv('/home/ubuntu/scheduler/pre/total3.csv', sep=',',index=False)

#print("크롤링 끝")
