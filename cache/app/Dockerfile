FROM nginx

COPY ./etc/default.conf /etc/nginx/conf.d/default.conf
COPY ./etc/nginx.conf /etc/nginx/nginx.conf

COPY ./src /usr/share/nginx/html

EXPOSE 4000

CMD ["nginx", "-g", "daemon off;"]