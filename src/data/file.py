l = []
with open("unlabeled_data.csv","r") as f:
    count = 0
    for line in f:
        if(count == 0):
            l.append(f"id,{line}")
        else:
            l.append(f"{count},{line}")
        count+=1

with open("id_unlabeled_data.csv","w") as f:
    for line in l:
        f.write(line)
