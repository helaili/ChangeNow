mysql --defaults-file=mysql.cnf < create.sql

read -p "Data created - Press enter to continue"

touch /tmp/gh-ost.test.postpone.flag

read -p "Flag file created  - Press enter to start the migration"

/Applications/gh-ost \
    --user=gh-ost \
    --password=gh-ost \
    --host=localhost \
    --port=3360 \
    --database=gh-ost \
    --table=changeNow \
    --alter='engine=innodb' \
    --exact-rowcount \
    --switch-to-rbr \
    --initially-drop-old-table \
    --initially-drop-ghost-table \
    --throttle-query='select timestampdiff(second, min(last_update), now()) < 5 from _changeNow_ghc' \
    --serve-socket-file=/tmp/gh-ost.test.sock \
    --initially-drop-socket-file \
    --postpone-cut-over-flag-file=/tmp/gh-ost.test.postpone.flag \
    --allow-on-master \
    --default-retries=1 \
    --verbose \
    --stack \
    --execute \
    --alter='change column c2 c2a int not null, change column c3 c3 int not null after id' \
    --approve-renamed-columns
