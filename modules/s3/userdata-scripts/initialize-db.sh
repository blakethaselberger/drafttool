#!/bin/bash
set -e

echo "Initializing MySQL database"
for sql_file in /opt/drafttool/sql/*.sql; do
    if [ ! -f "$sql_file" ]; then
        echo "No SQL files found in /opt/drafttool/sql" >&2
        exit 1
    fi
    echo "Applying $sql_file"
    sudo mysql -h $RDS_ENDPOINT -u $RDS_USERNAME -p"$RDS_PASSWORD" $RDS_DB_NAME < "$sql_file" || {
        echo "Failed to apply $sql_file" >&2
        exit 1
    }
done
echo "SQL initialization completed."