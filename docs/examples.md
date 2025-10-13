# getting started

You can use this library directly on netnet.studio by simply including a script tag in your sketch like this:

```html
<script src="https://cdn.jsdelivr.net/gh/netizenorg/netnet-standard-library/build/nn.min.js"></script>
<script>
  /* global nn */

  // ----------------------
  // YOUR CODE GEOS HERE!!!
  // ----------------------

</script>
```

The `/* global nn */` comment at the top of the script tag let's netnet (and other linters) know that there's a new global `nn` variable created by the library.

You can [download the minified library here](https://raw.githubusercontent.com/netizenorg/netnet-standard-library/main/build/nn.min.js) to use in your own JavaScript projects as well, but keep in mind that the `nn.fetch()` only works on netnet.studio (the rest of the properties and methods should work the same in your local projects)

Below are a few netnet examples which make use of the `nn` library and demonstrate different ways you can use it. You can find a list of all the methods and properties in the [README](../README.md)

# examples


## mouse properties

Here's an example of a [gif drawing tool](https://netnet.studio/?layout=dock-left#code/eJxVkc1OwzAMx8/0Kaxd2k1rI3Ec2yQkxBNwgGOaeG1Q6pTEZRrT3p2kLQUkJ47y//kr2Qe+WDxu4ApDQF8GtKh4B+QIH+C2F5Oe7YPypmcIXh1WLXMfdkIoTdV70GjNp68IWTStiM58ITnfpGO0MrAkLb0uram99BdRD8ZqQVR1JsWvjrHKmH0pc8zuxAYa62ppgQg2IgOIdhpIsXEE2sszFGu4xksAjx8DBn4k08kkP3vZYZGY9aiPmzlBkWq6OOeTO9NPMIByFBiaCBxisUp5lIxFbromX88IQBWQi2uafwe50lXEc7j90VUIUe9dMKmFCMk6ODsw/sek1i+uyGunL0v22cWUU5aFtnhKfzF3/QrlyJyN5hYE3G8XkF3/y73NXIumaTmBMzf3ccumFS2GOCpy66TOtzC9WLZ8xzclPaC2) which makes use of the `nn.mouseX`, `nn.mouseY` and `nn.mouseDown` properties (here's the same example in [vanilla JavaScript](https://netnet.studio/?layout=dock-left#code/eJyNUstuwjAQvPMVe0toS6h6bAGpaumpH0COxt4klhw7tTekqOLfu04CRSBVXGxndmY2+1gE2htcTQDu4IdPgDagnwU0KOkZrLP4wvBhspiPzEWQXjcUJQYJaseCDSzh8RzIL4F311nGCmECTjhQtFaSdhaUF106HXN7/Gox0KvVtYjRDy9qTCNlOukJuoD05HdUAUhnA0HJ0SUoJ9saLWXSoyBcG4xfaaLrMpmOfGZmwUtmMyxKDHNGwlyqjO/knBRrzhoXdP+zzBfb4ExLeM0yWBAzxobM+kinFVUwhye4h6T5vhaRa46afNRUqMuKrkWnwrZO7TPRNGjVW6WNSlk1VHboR8XH0NX46rRVrsuEUusdiz91ILTo06TPySGbPAAPYLkau3k+LvItRssbnNrmH59h7LcZ1W6H0QovveKSYSaNZs3mD87P4HzIwbs67OgvsSvgwg==) which would require setting up multiple event listeners).

## platform info

Internet artists often use cutting edge and/or fringe browser features and need to confirm whether or not the user's device support these features (and provide fallback content if not). The library includes a number of methods for checking what sorts of functionality the user's device supports, here's an example which makes use of the `nn.browserInfo()` and `nn.isMobile()` methods to [write a custom platform message](https://netnet.studio/?layout=dock-left#code/eJxtkM9qg0AQxs/1KYYQUANqWnqyxktPPfQBeouaUSfsH9ldbaz47p2oBAqFZXb3+30zzExm3Sgw9wBKfRlh4gdAi9S0LoXn43Fo3xbpQrYTxZhCLfC2StfeOqrHqNLKoWJ7xRHNCgtBjYrIobR/Qc3uyNIPpvDy2i2lZi9Ltjayexd5liyXl9nKUOfAmuq0UyqWpOKr3TFfwcORe0/JARqhy0KAUnBIuCwfgQ5KOLEUl0Z/WzQfqtZBGKtC4saH//iAxpJWm0Wyxff5QzUE7CX7qUsSGIThysC1CHLRYEsFXYO/dnHRVS95BfF9qtjhzb2vK+PU85fuoTAIvSXVwH6SM4dyhmE/DfPZ8x6z/gLW3IWT) onto the screen (here's the same example in [vanilla JavaScript](https://netnet.studio/?layout=dock-left#code/eJxtVG1P2zAQ/t5fcZMQSUabANqn0lJRxAc0daAhbZraSjjJpTEkcWU7oV3T/76Lnb7AkFKnuZfHzz139kDpdYbXHYBQxGvY0B+AFPki1X24OD+v0itjirlaZmzdhyTDlTW9lErzZN2LRKGxoPCIVpTWyTK+KHpcY67eOxKK7in+F/tw+W1poLadQdDSGDQsrgeBeXUGKpJ8qRt29CRlEWkuCuBqIkKeIbheS5gn4AY3RSwFj+s3DB+eav6YigLpxWJaRFyPMxa9jlHKdT0e149UzFiI1/r+zoLVv3kRizcFNu87fZHxiWev9cMSJYMJL3jAfY1KuwWr+IJpIf1SobxZUH3ejguARF3KArQs0Vi2gJnCj+6EkdH6O/Z3XGMoiQvK+yIRhzJJaaWhZDCETxiYkAw1TMhfMj9nOkrdwBUN/TpKpcixVixhktcJl5iIVZ0rjrWWPKZ8dzScBZ43C0Yz9dWdxWdewD2oa5jO99DUz4Pgbd5OlMn0Yn6kAoUSj2AWymoK/fmZRVz4uMLILdkx8l4T5/4OHDgDl5IJrQlxHG8vkt232QeGwyE4t6Ym5+Oeh9pnofvw+LO+ixdIdVkGXhvbQDXxXwipKLPM2/cNc19lPEL3wvNfBC9cBxzPl0gHgIwOITpdcMxUvCPX6D6ZXs5hBNOGZNd8zaEP00O72HL5g+XYhXemXygVtZ1geyNnvi/V/VhQZeN2tXDS+8B/4tMZNby7QI/V0BIMAohSjF7p+EkYS1bhbsL2e72Z+fcPtEITdnra6gXweYTPlQEke462L63lqDGT6Tn1DBxrvwLbQ8P7SMC2ARtooPomqQttyX2bc3RWmnkMCeToqLieYdE6q/+cLVbrb6R1nI4tf3epuCSpcYBOEXJ70bR5IBJw7OaxiMqcht9vbiqa/5W+tdcgpT7/ESUwiVAqXizgZJNvaQm3UJ1squ1zp7nu7MX2D9PlraA=) which would require creating custom functions).

## math methods

The library also contains a collection of mathematical functions commonly used by internet artist and creative coders which are not included in the JavaScript `Math` object.

This example uses the `nn.map()` method (which itself makes use of the `nn.lerp()` and `nn.norm()` methods) to create a [gif which resizes based on the mouse movements](https://netnet.studio/?layout=dock-left#code/eJxlUctOwzAQPJOvWOXSNErjgISQSlqJCzdOXLi6tpO48qPYDm2E+HfWSYgKSJad7Mzs7Ni1D4MS+wTgYPkAn/gB0AnZdmELt1X10T2OJS79SdFhC40Sl6l07H2QzbBh1gRhkM5wF24CqZKt2cggtL8GvpKazI51NNwnN7XULXjHdqnUtBWetLLxhPESzxT7hF1KgfEUFWSS1J45eQqTyJhSS1MefbrH1iOwMLA7yaFV9kAVGAM5wRFwNb1hQVoD3NEzZOs5thPvvfDhyeAgEX52VIssctYjjkF9ABwLdsAt6zXGKlHihlehBAvWZSsMs7pma9t78SINSqp/ZXrBMgY4Sx46IHD322aSPdz/qf6opleCHKpy5iA69xoJmp6yeESvt2IZpVjci7lfMbutxxcaryimzuJ/stzqNwEnq9s=), specifically it "maps" the mouseX value from a specified given min/max range to a target min/max size for the gif (here's that same example in [vanilla JavaScript](https://netnet.studio/?layout=dock-left#code/eJx9U8uu0zAQXdOvGHVTB9KkICGkS1KJBYgFrFhwt8aepkaxXWynbYT4d8YP9bYUkCJnPI8zx3Pszod5xO0C4JuVM/wkA2CPatiHB3i52Rz3b5NLKn8Y+fwAuxHP2fV98kHt5rWwJqChdEEruhzkoxrMWgXU/jrwa9G1pWMXG24XzzqlB/BO9Eul+YC+HdTOt0I29F8STuiXHIRcUkWbSzovnDqESJq+EQNoO3l8hB422bebjAjKGjDWaWBHPk5Yg1aGFn6uyjEdhsmZEoZ1jFfQAqOUskuMr/FGdAdgEfXfcE/l8DwTeBF3d1iaHy7UvJ2cwM8RsZj8XINEH5IvGXedIpnE5X8o1V9gEpXbQUnHT8CeGvyYKPedIUli+IPjGlnMqVKcJPcBSCAaubRi0iRwQyVu/oIjimAdW5Gsq+vspBHRKCrdumlkPZyUkfbUKGPQfVUy7EmMV7f9cv2b139478o/phtM8980JZnSmlMC7ePkWb4y9YVWfWFSF8i6NLwaV5wAq7Jd2nEp3x/p+J+Up1eAdPCEo+0RVzUwrKDflqlebik2YlRU8xiRExy9inynfwPrhRxW)).

This examples uses the `nn.dist()` method to calculate the distance between the mouse and the center of a circular gif and [adjusts it's opacity](https://netnet.studio/?layout=dock-left#code/eJx9U02P0zAQvfdXjHJJupQ4u4hbWgkhIXGFS3t07WlqlNjBnqhUaP87Y7ubfgg4ZTx+783MG6fdO33eLABaM3QQvFoXZpAdBtGZQxBK1/wtQPa0LiQoXWwWrcicNihvRsoka+vB2PpHKDatyBczIsqLJ+h6t5c9WAtPYsEp5WwgYHlYg3ZqGtBS/XNCf/6OPSpyviq5qXIZwYfJKjLOQkCaxmoJvzkJkV2fjKYja3ALXlrthuq5aVbwoWmWMybQucd6dMEkkTWUch9cPxGWD5geD3QnxlGu8P5abQnvoBx/PXLJjY/UI5ruSBduPtyQX+9G016e5sk8shWBPlleR7z94uWAVYTkqWb3vnHJqw0CXkCImCgDeKnNFO7hn7eMH6UP+NVSdT937CwpzgqKd4Ietg8au79r8Pz/lNglCc5qE0hahbBHOiFaoCPC4KaAwK6l04XiDunEMjflIz2bHKMqTbTKTa1iNiltr+Eu28WvrErUNrX35vLt9twolaEzizf1y8d0/QrYc1//wz5n4NsyL8+To7zNxfw3/AEoNw/L) when the mouse hovers over it. The web has it's own 'mouseover' event to detect when oun fire when the mouse is hovering over the transparent part of the gif as well (here's the same example in [vanilla JavaScript](https://netnet.studio/?layout=dock-left#code/eJyFVE2PmzAQvedXjHLBNCkkSHtLIq2qVq3UXtpDw9GxJ4klsFnbLIuq/PcOhrAk2nYPgD1+8+Z5PtgcjGx3M4CNKk/grNjOVclP6NKTOrpUyIS+c+CF3845CDnfzTZp77NxwqrK72bkLYx2HggKW5BG1CVqnzzVaNtfWKDwxrKIAkQxYQv0UJra4Z7Aq6khDwayHGstvDIaHPq6YjH8ISN0/EmjpD8T7gf358RyLU1J5x8gW61gAevVakQ63xaYVMapQLWFiB+cKWqP0R2mwKN/g7JRtGwSpTXa3yHsx4mEBUTVyz2TN9U7RF9Rnc5+YDr3m5HqQs/0+lJRVlm1fllCtW7plXWrrL0mpE97ZZr1NSqtGaGIP3hl8S0uu8W1AdeOOEvptrpHuCfrWaBeBM846LtRZ3kz1sYildv5R03t051+sbxE1kGmEujSP0nCaxZTyCBNO0PkwHKpancL/9R1ScWtw2/as9uaxSQtMI4MgvoOLezvOPK3Oaha/6TIAwVZuxpwLRAO6BtEDf6MfbsCVTjsBhdzDDuimYSX3UQQBQt3WfZylsMADN+8TxFND5OwCXquaZ02l6m4UL7thiTJHsLxBbAgIf/DrnvgtXrDRNGqL1/fcUOHcik/P9NlvpNgpGZlUdBXmmeMlsAwhu1uCDZOMCaiUOSzfzXnE3OXx0tMP43hb/EX7S5btg==)).


## color methods

The library contains a set of color utility methods for working with [color strings](https://developer.mozilla.org/en-US/docs/Web/CSS/color) including various methods for converting a color from one format string to another (from hex to rgb, or from rgb to hsl for example).
```js
function changeColor () {
  let bg = nn.randomColor()
  let fg = nn.randomColor()

  while (nn.isLight(bg) === nn.isLight(fg)) {
    fg = nn.randomColor()
  }

  nn.get('body')
    .content('click me')
    .css({ background: bg, color: fg })
}

nn.on('load', changeColor)
nn.on('click', changeColor)
```
The code above demonstrates how you would use the library to change the foreground and background color of a page randomly while also ensuring that there's roughly enough contrast between the two to make the text legible. This example makes use of the `nn.randomColor()` and `nn.isLight()` methods (in addition to the `nn.get()` method for modifying elements, as well as the `nn.on()` method for setting up event listeners).

Here is a commented and interactive version of [the example above](https://netnet.studio/?layout=dock-left#code/eJx9U8Fu2zAMPc9fQfQSu2ji7tomufTaW79AlmlZjUIZopwsG/Lvo2Q7ywpsgBEp5Ht6jxS15XhxuC8AGt9e4JdsAHq0po8v8P35+dS/5lBreXDq8gKdwx9T6HPkaLvLWnuKSALX8othSipnDa1txCP/negEvWb7E9Pxp/Nd8DyrNt61U3hkDGtGh1rC5AlfQeLXYlvProst62CHCBz07qGPceCXutYtbT65RWdPYUMYa9PXsogm+WDSVr41R0WtCu3a2SaocKmb0bq2JtocbeI/7EUmn75fZPbFN4D6EYzzjXJABI+1GJKvG0lH6wl0r8jgm3c+QFnN/XQYoTGwE8YmiKo/ZkBZ3bLdP7N1DbZLbMkkmAooHYo9uNQtEJn8Tyo5LPjYI0EYKW3AeT9krmKWK8lHAOEZJinQSWthHhCHzLBkYKRoXcYLu5mU010HJfdOJnPOvXUIpTi3/J4MlY2pYLfLxSyhzlRLJ+A/lV4XF540Zu8hl/jFQe8ZaYGOQ6viBE7zu2J4+/jIcBsZ5snMYJE0GMtVhlWzmc2MKFfaWX2AI96lmMvFtLwOpQ8m+JFaGVDzdIvn9smrMHPkWhVTJUX2t9zC/VjcZkUxsJ/WhBmUSdelWp64Ej6jc2lVdIn2ONWZHgWIXT6wdOrGLHKJnspVOmL1dC9Z/UnmOr9mi9uk/wYY8EMU), and here's a version of what that code would look like in "[vanilla](https://netnet.studio/?layout=dock-left#code/eJyVVNty2jAQfecr9iEzyAmYS8ukSSA8ZPqWfkFJJ5ItyypCopIch2b496xkm0KadtoZZlmfPau9aFdz53eK3/YAmMl38IIKQMmlKP01TMbjp/ImQrl0W0V311Ao/txA3yvnZbEbZkZ7rpGeoeS2MVIlhR5Kzzfu1FAge+jkTx6Of6qPwLqNyozKG7hy3A4dVzxDWBvNbwDxfW8+arPuzV1m5daH/PFXVDrz0miwVOdmc2eUsUCStirM03mwsIAv1JdpoYyxJKoNHYnnMJ3NkiO2+C82+0e25b6yGh6tYOTsxe4HcPYiomT75DGWeFqPdPehN0CyUFJXkOJYzgDEAFibRKh30fynG+qzkoy+YRC6XBGyyi+Swcqdnypked3pqK7SgC2TZLlKzkZtst2JXycPERAHYNoA7AB8eOgdtaN0264h7of1ZJxOr66wD8SiwCouYJzOPl0GRKAQDTKZfAwIQ8GSk36F825hMr1MZ+/0KCupFvzNnYcWsZDw0USQ5GAqfjdF22gEsgiOaAokajmOpS9BxWvACPErp3bd8X3Jce4qHRTA699GX+oc7kE8AjSv21hNtzrPNefb6CG1gEp7qSIfvVkTOSyYpbhsWkSfupSKA2mHgjBs3GKx6IaEFCLpyof3KgzwvqkzN1m1weVMw/KncalSRrO1sKbC+AvM4I+8btqK9yieP/u75l1ASr/kShmojVV5/9fV1RLTqlOa55+fkHgvHfK5JX1laN4fHN9o8jd6pmS2fssPj0TzNrwCKBR25g==)" JavaScript (without the library) for context. In that version the `randomColor()` and `isLight()` methods created from scratch. Except that the functions in this example can only work with `rgb()` color strings, whereas the functions in the library can work with all types of color string formats. Refer to the [`nn.randomColor()`](API.md#randomColor) documentation for other examples.

Here's another example with similar goals, but instead of generating two colors it creates an entire color scheme based on a given 'harmony' (in this case 'analogous') with the added requirement to meet 'AA' WCAG guidelines.

```js
// build an analogous scheme that meets WCAG AA against white
const colors = nn.colorScheme({
  harmony: 'analogous', // type of color scheme
  base: '#4a90e2', // initial base color
  count: 5, // number of colors in the output array
  contrast: 'AA', // must meeet minimum 4.5 contrast
  against: '#fff', // assuming background is white
  strategy: 'adjust' // tweak lightness to meet contrast
})

// render color swatches
const wrap = nn.create('div')
  .css({ display: 'flex', gap: 12, padding: 12 })
  .addTo('body')

colors.forEach(clr => {
  nn.create('div')
    .css({
      width: 100,
      height: 80,
      padding: 10,
      background: clr,
      color: '#fff'
    })
    .content(clr)
    .addTo(wrap)
})
```


## DOM methods (HTML elements and CSS)

The library contains methods for more easily working with the [DOM API](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model), similar to libraries like [jQuery](https://jquery.com/) except with a syntax and structure designed to more closely resemble the native API. At the center are two methods `nn.get()`, `nn.getAll()` and `nn.create()`, these will either "create" or "get" (if it's already on your page) a lightly "overloaded" HTML element. Here "overloaded" means that you'll get directly access to all the native DOM API features, as well as some additional friendlier methods provided by the nn library. Below is a basic example, which you can also [view/edit](https://netnet.studio/?layout=dock-left#code/eJx1j91qBCEMhe99imAvZrqwyt4WR9iLPoijVi1OFE1btk9fZ3dbKKUQyA/fSXJUPEFyC6dE2XMN2wWqCR6uPSgZT5qpCjab3hee8KUMqJfNw163zVAqOLj6H1Yo+vYXZqrblipBb3bhkaj2JymtQ/Hanc/pvQn0JEOUI6VPj6WFvRxx7GTQmeaOOa3NtItc31J2ElFsaddzreRtu/4+o5k8QMhlNRkQ4SAZABuC4GmeHq5mp0dhC5LHMUH/Afchu2PnnOdJ7D4GOMw8GxvnCouG+lt3Q4bu54kvxdp20Q==) on netnet.studio.

```html
<h1 id="title"> my page title </h1>
<p class="info"> some information </p>
<p class="info"> some other information </p>

<script src="https://cdn.jsdelivr.net/gh/netizenorg/netnet-standard-library/build/nn.min.js"></script>
<script>
/* global nn */

nn.get('#title').content('new title')

nn.getAll('.info').forEach(p => p.content('new info'))

</script>
```

The example above demonstrates how to pass [CSS Selectors](https://www.w3schools.com/cssref/css_selectors.php) to `nn.get()`and `nn.getAll()` to gain access to (and in this case modify the content of) existing HTML elements on your page. But you can also create your own HTML elements dynamically with `nn.create()` and passing the name of the type of element you want (as a string). If/when you want that new element to appear on your page you'll need to add it to an existing element by using the `.addTo()` method which takes a single argument, a CSS Selector of the element you want to add your newly created element to. You can [view/edit](https://netnet.studio/?layout=dock-left#code/eJxtUcFqwzAMvecrXntJV5b4PtrAoJcdxnbYDzixmng4crGdZNnXT1kIg20gkNDj6T1Jp9qbucpOu6JA6myExNRRIEyUO4eaoI2x3MIPAUwTyFFPnFAUQlMrPTvFJthbQgzNed+ldIsPSjWGy/doyNkxlExJtZ2SZD+JfWiXUqKISbPRwRTO1kGHWdWDdUYxl71d+PvqpNbp1SZTZeqI1vlaOzDjqDIgE0ITSCc65MaO+Z30ysZzEq+HvCPnPCYfnNmtkGz15g/54v+7kSmFZe88QrNPUmLSM5Kwgk0Em8qyzGRgTMsZLnbEGX80V+S3rm615d0P/J/2RGg0Q7vo0Xtjr6LdUaTt3hFDXN6g5SkCgHWyI+Hy8ozH1ydcxcUQKN7j6gPoQ/c3R5teTLMjMeUEOiMPZHJ52XbVLyDYqpw=) the example below on netnet.studio.

```js
nn.create('div')
  .content('hello world!')
  .addTo('body')

// here's another way to write it...
const newDiv = nn.create('div')
newDiv.content('hello again!')
newDiv.addTo('body')

// we can also modify these elements using all the native DOM API features, for example
newDiv.style.color = 'red'
```

As you can probably already tell, the `.content()` method updates the elements content, this can be simple text but it can also be HTML code, for example `newDiv.content('<b>hello again!</b>')`. In addition to all the native DOM API interfaces, there are a number of other properties and methods the nn library adds to these lightly "overloaded" elements, for example:

| Property | Description                                                      |
| -------- | ---------------------------------------------------------------- |
| `x`      | The horizontal coordinate of the element (in pixels).   |
| `y`      | The vertical coordinate of the element (in pixels).     |
| `width`  | The width of the element (in pixels).                            |
| `height` | The height of the element (in pixels).                           |
| `top`    | Distance from the top edge of the viewport to the element (px).  |
| `left`   | Distance from the left edge of the viewport to the element (px). |
| `bottom` | Distance from the bottom edge of the viewport to the element (px).|
| `right`  | Distance from the right edge of the viewport to the element (px). |


| Method     | Description                                                                 |
| ---------- | --------------------------------------------------------------------------- |
| `.content()`  | Adds or replaces the element’s content (text or child HTML strings).      |
| `.set()`      | Applies one or more HTML attributes (e.g. `id`, `src`, `alt`, `type`, etc) from an object. |
| `.css()`      | Applies CSS styles via an object mapping CSS properties to values.         |
| `.addTo()`    | Appends the element to a target (selector or element), removing it from any previous parent. |
| `.on()`       | Attaches an event listener (alias for `addEventListener`).                 |


The example below demonstrates some of those properties and methods in action, you can also [view/edit](https://netnet.studio/?layout=dock-left#code/eJxlT0FOxDAMvOcV1l6SrtikWnFCTV/BB9IkdA3ZpIqzoAXxd9xWcEGyZGtmPGMPUwn3cTBbE2IgX3FpQNXbw6W1hZ6M8SHrVwox4XvVOTYzXww3/Iy51HkduU7UXA6uhlPCqbp6N9MNUzA56yuu+wdO2d3H35hRmCPMqUwuQc5wNEL4kqnBjC9gGdK+RteiknidZScANMWmJF8nH0D6oFm4455ISX+rVOpKLQVzi3XnXAjPRcn1xR0ombUJ/RtLVQd2hC+GAThVsaP+wNAuYK2Fc9+tx+z2G8wrj33fbfqYKP6nzxv73Ym/f38A69xuZg==) the example below on netnet.studio.

```js
const gif = nn.create('img')
  .set('src', 'cd.gif')
  .css('cursor', 'pointer')
  .addTo('body')
  .on('click', () => {
    if (gif.width === 20) gif.css('width', 400)
    else gif.css('width', 20)
  })
```

Here's another example which demonstrates how to pass multiple HTML attributes to the `.set()` method as well as multiple CSS properties to the `.css()` method. Here we also use the `nn.width` and `nn.height` properties to find the center of our page/window as well as the `nn.sleep()` method to delay the CSS change in the mouseout event. You can also [view/edit](https://netnet.studio/?layout=dock-left#code/eJx9Uc1qwzAMvucpRC9ORhtnPZY2l+0R9gKOrSYerh0spaUbe/fZSdcyGAODjPT9Ce27YK7tXs6lKPakox0ZKOrDamAeaSelNr5+J4POnmPtkWU/yFTsB/oQ+/xNb0OsvFHRbJztoopX2U3WGel9fbKZv0oui3r7Y9MW8gl6FzrlwHt4kkWhgyeG3h7hkFq1jqgYS2FPvagKgJqQy8/0gRxxB0KbOoHFem4px6mlICLHMIuEIyh4eRVp/DXzNdGNPwaybIPPjI6CmxhvMg6PSSe5X6zhASRs1yAlaPSMWXFUPc5ADuMOMnBA2w/8HzIqf7dbZLf0SKWMeQulyEdY1gy+FKcwEYYzRrGGsoJDC0vwtNe8xqKThk11F3rwJk4TRVevf5HVRVnOkckhjuVz0zRVjjy3FRCmA5i/bRL2ZnQ/5DcLLaxB) the example below on netnet.studio.

```js
const gif = nn.create('img')
  .set({
    src: 'cd.gif',
    alt: 'a retro gif of a CD'
  })
  .css({
    position: 'absolute',
    left: nn.width / 2, // center of page
    top:  nn.height / 2, // center of page
    transition: 'width 2s'
  })
  .addTo('body')
  .on('mouseover', () => {
    gif.css('width', 0)
  })
  .on('mouseout', async () => {
    await nn.sleep(1000) // wait a second
    gif.css('width', 100)
  })
```


There are also a number of other methods for directly modifying CSS transform functions and filter functions

| Method                       | Description                                                        |
| ---------------------------- | ------------------------------------------------------------------ |
| `.blur(val)`                  | Sets CSS filter `blur(val)` on the element.                         |
| `.brightness(val)`           | Sets CSS filter `brightness(val)` on the element.                  |
| `.contrast(val)`             | Sets CSS filter `contrast(val)` on the element.                    |
| `.dropShadow(x, y, blur, color)` | Sets CSS filter `drop-shadow(xpx ypx blurpx color)` on the element. |
| `.grayscale(val)`            | Sets CSS filter `grayscale(val)` on the element.                   |
| `.hueRotate(deg)`            | Sets CSS filter `hue-rotate(deg)` on the element.                  |
| `.invert(val)`               | Sets CSS filter `invert(val)` on the element.                      |
| `.opacity(val)`              | Sets CSS filter `opacity(val)` on the element.                     |
| `.sepia(val)`                | Sets CSS filter `sepia(val)` on the element.                       |
| `.saturate(val)`             | Sets CSS filter `saturate(val)` on the element.                    |
| `.scale(x, y)`               | Applies CSS transform `scale(x, y)` on the element.                |
| `.rotate(deg)`               | Applies CSS transform `rotate(deg)` on the element.                |
| `.skew(xDeg, yDeg)`          | Applies CSS transform `skew(xDeg, yDeg)` on the element.           |
| `.position(x, y, type)`      | Positions the element at `(x, y)` with the given CSS `position` type (`absolute`, `relative`, etc.). |
| `.positionOrigin(type)`      | Sets the reference origin for `.position()` (`center` or `default`). |

Here's an example of some of those in action which you can also [view/edit](https://netnet.studio/?layout=dock-left#code/eJw9UMtOxDAMvOcrrL0k3UdSEFxQtxIXPgDxA2mTbYNapyQu0oL4d9x2QYo0ztgz46RqorvWlVlBiCq3KUwEObXnXU805SdjWof6PTs/hM+k0ZPpesMQvjzG1C0ln1Mmi84mdxpCk2y6mmYOgzOIegyLfscpm3v9F1MLs4duiI0dABH2Rog2YibowgXOTOk2eUteyTB2shAAOntSkreTR5ABySeO1jy+daeYA4WI6q4sj3BfliubIi0mD4/rzTr3FpVcHswiMXiCfvYcVwpxmbFd9GAxjKwBVcA3i5L/mH2m55Xl/kuyo1e3ocWVHQ4HRt5Ec/26JXJViB+mxW1UFeL/E34BvLJ5ow==) on netnet.studio.

```js
const gif = nn.create('img')
  .set('src', 'internet.gif')
  .position(100, 200)
  .rotate(45)
  .addTo('body')

let hue = 0

function animate () {
  requestAnimationFrame(animate)
  hue++
  gif.hueRotate(hue)
}

animate()
```

### Type-safe data (dataset vs data)

In HTML you can add arbitrary data to elements using the [custom data attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/data-*) like this:
```html
<body data-num="10"></body>
```
The DOM API creates a JavaScript interface for this in the [dataset property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset), but unfortunately it converts everything into a string
```js
document.body.dataset.num // returns the string "10" not the number 10
document.body.dataset.num = 21
document.body.dataset.num // now "21", but still a string
```

The overloaded elements returned by the `nn` library contain a proxy/alias property called `data` which maintains the type values, for example:
```js
nn.get('body').data.num // would return the number 21
nn.get('body').data.num = 100 // now the number 100

document.body.dataset.num // would still return a string "100"
```

The values are still stored in custom data attributes and accessible via `dataset`, the `data` property just reads those values and parses them out into their actual types (numbers, booleans, null/undefined, JSON objects/arrays). Writing to `data` serializes the values back into `dataset`. Values like `<body data-big-num="1000">` can be accessed via camelcase `nn.get('body').data.bigNum`.

```js
const el = nn.create('div').addTo('body')

// "writing" serialize to attributes
el.data.count = 3 // <div data-count="3">
el.data.flag = true
el.data.cfg = { a: 1 }

// but "reads" give typed values
console.log(el.data.flag)  // true (boolean)

// Reading existing data-* attributes is parsed
el.set('data-speed', '2.5') // like having <div data-speed="2.5">
console.log(el.data.speed)  // 2.5 (number)

// Remove via undefined or delete
el.data.count = undefined   // removes data-count
delete el.data.flag         // removes data-flag

// Snapshot all parsed data
const obj = el.data.toJSON() // { speed: 2.5, cfg: { a: 1 } }
```

## canvas methods

This is a very light wrapper around the native [Canvas 2D API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API). The idea is to learn the real API, not hide it. When you do `nn.create('canvas')`, you get an nn element with the usual helpers plus the CanvasRenderingContext2D interface right on the element.

You can find a useful [Canvas API "cheat sheet" here](https://simon.html5.org/dump/html5-canvas-cheat-sheet.html).

In addition to all those default Canvas API properties and methods, the nn library includes a few extra properties and methods to help beginners:
  - `.resize(w, h)`: resizes the buffer, preserving state and pixels.
  - `.fitToParent(dpr?)`: fits canvas to its parent and scales for high‑DPI.
  - `.mouseX`, `.mouseY`, `.mouseDown`: mouse position/pressed relative to the canvas.
  - a friendlier `c.drawImage(...)`: waits for image load; uses natural size if omitted.
  - pixel helpers: `.getPixelData(x,y,w,h)`, `.getPixels()`, `.setPixels(pixels, x,y,w,h)` to read/modify pixels.
  - quick draw methods: `.circle(x,y,r)`, `.ellipse(x,y,rx,ry)`, `.rect(x,y,w,h)`, `.line(x1,y1,x2,y2)`, `.triangle(...)` which immediately fill+stroke.

**NOTE**: The original canvas API actually already includes methods called [rect](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/rect) and [ellipse](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/ellipse) meant to be used when construing paths, since we use these names for our "quick draw" methods, the originals have been renamed to `.pathRect(...)` and `.pathEllipse(...)` so you can still use those if you want to construct these shapes using paths the manual way.

Example: draw an image, paint circles while dragging, and invert pixels

```js
nn.get('body').css('margin', 0)
const c = nn.create('canvas').addTo('body').fitToParent()

// draw an image (auto-waits for load and sizes if needed)
const img = nn.create('img').set('src', 'dog.jpeg')
c.drawImage(img, 0, 0)

// use native canvas properties
c.fillStyle = 'hotpink'
c.strokeStyle = 'black'
c.lineWidth = 3

// create a "draw" loop
function draw () {
  requestAnimationFrame(draw)
  if (c.mouseDown) c.circle(c.mouseX, c.mouseY, 30)
}

nn.on('load', draw)


// invert function using pixel helper methods
function invert () {
  let pixels = c.getPixels()
  for (let i = 0; i < pixels.length; i++) {
    pixels[i].r = 255 - pixels[i].r
    pixels[i].g = 255 - pixels[i].g
    pixels[i].b = 255 - pixels[i].b
  }
  c.setPixels(pixels)
}

nn.create('button').content('invert').addTo('body')
  .on('click', invert)
```


<!-- https://netnet.studio/?layout=dock-left#code/eJyVVk1z0zAQvfMrdtJhGhcndgppaXByKJSBGWYYpr1wVGw5ETiSkeQ0pcN/Z/Vh16GUiIu11r63elrJ3s2Uvqvo4hnAUhR3cI8GwJqy1VrP4HWabtdv7NSS5N9XUjS8mEHFOCVytJKkYJTr4dHV2bvLs/eQPo/h6PUkv7h4BVP7kk+mk/MUJmn6PHJxRKMNfWbm6h0UQmtawNEUgRcXe5CRKEtFUcVoMkUoun49wwcnW6+yFoppJvgMSrajhSP/HDFe0N0MTt+0jCOlidSxsUrGmVo/4pOlElWjqQuh6U6PSMVW6Mlxf1S6+VtW6LUVvr11MxsiV4ybqXrnZkrB9Uixn7jBMz/Z0+AX1qLGyKTKhzbBcALp+HQaOTDAI6F/w5+3+CzxJ5iZAzQHmWGKFpaYKVrRXLsXfBW12S9sSdXQ+eAj/9KQYrBwY5Y47xPgz412aG8cgH/kHaEzD1LeNkuWG4I1Dgvy+NYKkdQtEUxC5VL7JEkdlCWDb63APLklgklfGsa9KDRCRFl8a4WJ8ksEk67xozUEMx6W5NDeCBHUhg+lvGXSXSYcA+6SRXsj6Cb58KGUq4oo7e6eNw+L6jgPdoi03lL/Qbza1cKqwzFAmkV7I0iUDx9KucSCY/BmPCzHob0RIqcNH0q5xNKX2/vnrABJntGZ+xT8b/d+ztmy0RpdKpeiqrLEv5q/eeJ/51nBtsCK+cCWksHCDlmCs3teVzkGCzd6Pwa0xSHD+KzWoGQ+H3A+3jA+/qYGCxRjHR3ChExOYFWJJamAczhJTBnLBVfItiIvrUSYYw3Pmw3WyfGPhsq7a7srIYfHbg/HUcejRFHnZv8kusQgEZklZs7C9S2lfKjvahpDKcUmxrIYA8MwaeTrJCthqNdMjS32hm2ojCCvsFcxNrYVj7yW5sQVjcRYp5AkxiR2TcZBUXQXqgcsa4VA7AJSSOBlagj4LCXZUAU1lZ7SYzCeGwbYyPjECE4vvJgbZyeewQJxEUiqG8l7EbBVwQh4YCaFPgmsr/6rc29IPURsDGkMk4c8Rb5/4YW4HbvTuxFDxHx1nj/SgrGw8WpzNoxgvngq/VFsdhO1bU7/ZoxJUVxt8Xg/MaUpp3iwecXy78cxuJD3Pf0mMC67d0PG9lvqgZbr/qUxN9pv5oPtV3tI123NDcM1V3s+UT+4zqdP5cbGcPl5lI17/9X3s+K6TBvesX7F2AWnNjd4lbtP7DdT/pVs -->
