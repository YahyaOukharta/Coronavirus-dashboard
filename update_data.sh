curl $1 > $2.tmp

DIFF=$(diff $2 $2.tmp)

if [ "$DIFF" != "" ]
then
    echo 'updating'
    cat $2.tmp > $2
else
    echo 'up to date'
fi