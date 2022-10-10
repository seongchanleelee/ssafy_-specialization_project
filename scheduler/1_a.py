import nabcSc
import time
from multiprocessing import Pool
import pandas as pd

# 10개 기준 약 12분
# 100개 기준 약 2시간 덜 걸림
# 300개 기준 약 6시간 덜 걸림
# 9810 - 11773
start_num = 1        #관광지 시작 번호 - 끝번호 그대로 넣고 시작
last_num = 5        #관광지 끝 번호 

start_time = time.time()

#df = pd.read_csv("관광지목록.csv", encoding='utf-8')
df = pd.read_csv("/home/ubuntu/scheduler/관광지목록.CSV",encoding='utf-8')
word_origin = df['명칭'].values.tolist()
word = word_origin[start_num:last_num]
print(word)

start_time = time.time()
# print("시작")
pool = Pool(processes=8)
pool.map(nabcSc.travel, word) 

print("[ %d ~ %d ]  # 종료 %s 초" %(start_num, last_num, (time.time() - start_time)))
