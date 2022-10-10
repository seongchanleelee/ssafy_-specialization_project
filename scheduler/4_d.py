# 최대 길이 25만자에서 자르기

import pandas as pd
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
df.head()


# df.tail(10)
df.to_csv('/home/ubuntu/scheduler/pre/total3.csv', sep=',',index=False)