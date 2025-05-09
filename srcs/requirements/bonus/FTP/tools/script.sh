#!/bin/bash


mkdir -p /var/run/vsftpd/empty


cat <<EOF > /etc/vsftpd.conf
# Run in standalone mode
listen=YES
# Security settings
anonymous_enable=NO
local_enable=YES
write_enable=YES
local_umask=022
# Logging
xferlog_enable=YES
# Passive mode settings for Docker
pasv_enable=YES
pasv_min_port=30000
pasv_max_port=30009
# User settings
local_root=/var/www/html
# Chroot users to prevent them accessing other parts of the filesystem
chroot_local_user=NO
# allow_writeable_chroot=YES
secure_chroot_dir=/var/run/vsftpd/empty
# Additional security
hide_ids=YES
EOF


useradd -m ${FTP_USER}
echo "${FTP_USER}:${FTP_PASS}" | chpasswd

chown -R $FTP_USER:$FTP_USER /var/www/html

ln -s /var/www/html /home/${FTP_USER}/wordpress


/usr/sbin/vsftpd /etc/vsftpd.conf