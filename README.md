# shwks-mern-ecommerce-proj


## create boiler plate for react 

```
npx create-react-app frontend
```

for styling use bootswatch
- https://bootswatch.com/
- Download lux 
- npm i react-bootstrap 
- https://react-bootstrap.github.io/components/navbar/
- https://cdnjs.com/ - font https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css
- -https://fontawesome.com/

DB
- mongoosejs.com

Paypal
-https://developer.paypal.com/developer/applications
https://developer.paypal.com/docs/checkout/reference/customize-sdk/


https://www.npmjs.com/package/react-helmet


deployment 
- 
```sh
  cd frontend 
  npm run build 
  cd .. 
  npm start
```
- install heroku cli - brew tap heroku/brew && brew install heroku
```sh
 heroku login
 heroku create shwks-mern-app
 heroku git:remote -a shwks-mern-app
 git push heroku master
```
- create Procfile