#!/usr/bin/env bash
# exit on error
set -o errexit

# sudo apt update
# sudo apt install firewalld
# sudo systemctl enable firewalld
# sudo systemctl start firewalld
# sudo firewall-cmd --state
# sudo firewall-cmd --list-all
# sudo firewall-cmd --permanent --add-port=80/tcp
# sudo firewall-cmd --reload


pip install -r requirements.txt
python3 manage.py makemigrations
python3 manage.py migrate


python manage.py collectstatic --no-input

# python manage.py runserver 0.0.0.0:80 --insecure
