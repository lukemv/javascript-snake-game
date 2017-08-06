#!/bin/bash
docker run -p 8080:80 -v "$(pwd):/usr/share/nginx/html" nginx
