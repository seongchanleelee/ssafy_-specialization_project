# 데이터 전처리
import pandas as pd

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