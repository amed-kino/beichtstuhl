LAST_FILE=$(ls ./outputs/ -lat | head -2 | tail -1 | awk '{print $9}')
cp ./outputs/"$LAST_FILE" ./outputs_accepted/"$LAST_FILE"
