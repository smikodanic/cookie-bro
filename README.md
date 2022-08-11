# cookie-bro
> Library which helps with cookie management in the Browser environment.


## Installation
```bash
$ npm install --save cookie-bro
```

## Howto
```
HTML
<script src="node_modules/cookie-bro/index.js">

JS
const cookieBro = window.cookieBro;
const cookies = cookieBro.getAll();
```

## Example
A puppeteer example.

```js
/*** NodeJS script ***/
// inject to Chromium browser via <script> tag
await page.addScriptTag({ path: '../index.js' }); // path to cookie-bro file

const cookies = await page.evaluate(() => {
  const cookieBro = window.cookieBro;
  cookieBro.setOptions({
    domain: 'adsuu.com',
    path: '/',
    expires: 5, // number of hours or exact date
    secure: false,
    httpOnly: false,
    sameSite: 'strict' // 'strict' for GET and POST, 'lax' only for POST
  });
  return cookieBro.getAll();
});
console.log('cookies::', cookies); // _ga=GA1.2.686576916.1660229610; _gid=GA1.2.2130293818.1660229610; _gat=1
```



## API

#### setOptions(cookieOpts) :voids
```js
interface CookieOpts {
  domain?: string;
  path?: string;
  expires?: number | Date; // number of hours or exact date
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: string; // 'strict' for GET and POST, 'lax' only for POST
}

setoptions(cookieOpts:CookieOpts)
```


#### put(name:string, value:string) :void
Set the cookie. Cookie value must be a string.

#### putObject(name:string, value:object) :void
Set the cookie. Cookie value is object.

#### getAll() :string
Get all cookies in string format **cook1=jedan1; cook2=dva2;**

#### get(name:string) :string
Get a cookie by specific name. Returned value is string.

#### getObject(name:string) :object
Get a cookie by specific name. Returned value is object of parsed value.

#### remove(name:string) :void
Remove cookie by specific name.

#### removeAll() :void
Remove all cookies.

#### exists(name:string) :boolean
Check if cookie exists.




### License
The software licensed under [AGPL-3](LICENSE).
