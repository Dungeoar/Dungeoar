## NodeJS Layered File System

This is a simple module that enables you to layer several file system paths on top of each other. Every layer added will be added to the bottom, so the first layer added is the main one (and the first checked).

When you want to get a file you ask the module and it will return the first path to that file, starting from the first layer. If it does not exist it will check the next layer and so on.

Take a look at this example:

```js
var LFS  = require("lfs");
var myfs = new LFS();

myfs.add("/my/app/public/"); // application public folder
myfs.add("/platform/common/public"); // platform common stuff
```

When you ask for a file path, for example `/my-file.txt`, it will check first if `/my/app/public/my-file.txt` exists. If it does it will return this path. If not it will check if `/platform/common/public/my-file.txt` exists. If it does it will return this other path, otherwise it will return `null`.

Following the example, let's consider `my-file.txt` exists in the second layer.

```js
var myfs_path = myfs.get("/my-file.txt");

console.log(myfs_path); // /platform/common/public/my-file.txt
```

This is synchronous or asynchronous if you pass a callback.

```js
myfs.get("/my-file.txt", function (myfs_path) {
    console.log(myfs_path); // /platform/common/public/my-file.txt
});
```

### Options

Instead of calling `.add()` you can pass a list of layers in the constructor.

```js
var myfs = new LFS({ layers: [ "/my/app/public/", "/platform/common/public" ] });
```

#### Cache

LFS can cache the results so the next requests under a certain period will recieve the same response. You can activate it by passing a `cache` option with a numeric value in milliseconds.

```js
var myfs = new LFS({ cache: 30000 }); // 30 seconds cache
```

#### Get Layer

If instead of the file path you want the layer that matches, you can pass the option in the constructor or in the method.

```js
var myfs = new LFS({ layer: true });
myfs.get("/my-file.txt", { layer: false }); // option for this call only
```
