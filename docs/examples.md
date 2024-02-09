# getting started

You can use this library directly on netnet.studio by simply including a script tag in your sketch like this:

```html
<script src="nn.min.js"></script>
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
The code above deomonstrates how you would use the library to change the foreground and background color of a page randomly while also ensuring that there's roughly enough contrast between the two to make the text legible. This example makes use of the `nn.randomColor()` and `nn.isLight()` methods (in addition to the `nn.get` method for modifying elements, as well as the `nn.on` method for setting up event listeners).

Here is a commented and interactive version of [the example above](https://netnet.studio/?layout=dock-left#code/eJx9U8Fu2zAMPc9fQfQSu2ji7tomufTaW79AlmlZjUIZopwsG/Lvo2Q7ywpsgBEp5Ht6jxS15XhxuC8AGt9e4JdsAHq0po8v8P35+dS/5lBreXDq8gKdwx9T6HPkaLvLWnuKSALX8othSipnDa1txCP/negEvWb7E9Pxp/Nd8DyrNt61U3hkDGtGh1rC5AlfQeLXYlvProst62CHCBz07qGPceCXutYtbT65RWdPYUMYa9PXsogm+WDSVr41R0WtCu3a2SaocKmb0bq2JtocbeI/7EUmn75fZPbFN4D6EYzzjXJABI+1GJKvG0lH6wl0r8jgm3c+QFnN/XQYoTGwE8YmiKo/ZkBZ3bLdP7N1DbZLbMkkmAooHYo9uNQtEJn8Tyo5LPjYI0EYKW3AeT9krmKWK8lHAOEZJinQSWthHhCHzLBkYKRoXcYLu5mU010HJfdOJnPOvXUIpTi3/J4MlY2pYLfLxSyhzlRLJ+A/lV4XF540Zu8hl/jFQe8ZaYGOQ6viBE7zu2J4+/jIcBsZ5snMYJE0GMtVhlWzmc2MKFfaWX2AI96lmMvFtLwOpQ8m+JFaGVDzdIvn9smrMHPkWhVTJUX2t9zC/VjcZkUxsJ/WhBmUSdelWp64Ej6jc2lVdIn2ONWZHgWIXT6wdOrGLHKJnspVOmL1dC9Z/UnmOr9mi9uk/wYY8EMU), and here's a version of what that code would look like in "[vanilla](https://netnet.studio/?layout=dock-left#code/eJyVVNty2jAQfecr9iEzyAmYS8ukSSA8ZPqWfkFJJ5ItyypCopIch2b496xkm0KadtoZZlmfPau9aFdz53eK3/YAmMl38IIKQMmlKP01TMbjp/ImQrl0W0V311Ao/txA3yvnZbEbZkZ7rpGeoeS2MVIlhR5Kzzfu1FAge+jkTx6Of6qPwLqNyozKG7hy3A4dVzxDWBvNbwDxfW8+arPuzV1m5daH/PFXVDrz0miwVOdmc2eUsUCStirM03mwsIAv1JdpoYyxJKoNHYnnMJ3NkiO2+C82+0e25b6yGh6tYOTsxe4HcPYiomT75DGWeFqPdPehN0CyUFJXkOJYzgDEAFibRKh30fynG+qzkoy+YRC6XBGyyi+Swcqdnypked3pqK7SgC2TZLlKzkZtst2JXycPERAHYNoA7AB8eOgdtaN0264h7of1ZJxOr66wD8SiwCouYJzOPl0GRKAQDTKZfAwIQ8GSk36F825hMr1MZ+/0KCupFvzNnYcWsZDw0USQ5GAqfjdF22gEsgiOaAokajmOpS9BxWvACPErp3bd8X3Jce4qHRTA699GX+oc7kE8AjSv21hNtzrPNefb6CG1gEp7qSIfvVkTOSyYpbhsWkSfupSKA2mHgjBs3GKx6IaEFCLpyof3KgzwvqkzN1m1weVMw/KncalSRrO1sKbC+AvM4I+8btqK9yieP/u75l1ASr/kShmojVV5/9fV1RLTqlOa55+fkHgvHfK5JX1laN4fHN9o8jd6pmS2fssPj0TzNrwCKBR25g==)" JavaScript (without the library) for context. In that version the `randomColor()` and `isLight()` methods created from scratch. Except that the functions in this example can only work with `rgb()` color strings, whereas the functions in the library can work with all types of color string formats. Refer to the [`nn.randomColor()`](API.md#randomColor) documentation for other examples.

## mouse properties

Here's an example of a [gif drawing tool](https://netnet.studio/?layout=dock-left#code/eJxlkdtuwyAMhq+bp7B6k6RTibTLLa007fAM2yUFN2EiJgNHXVX13eekB1WrZEDY3w/+oU6897jOABZwgCFhXCb0aPgJKBA+wzGrqzNTJxNdz5CiWc2JVOdIfaf5WoCpcCXW2axaQOPDRnsggkUl50tsBzLsAoGNegdFCQdJAkT8GTDxC7lOj+WPqDssRqac6tPktlCMdwbp8S3s6CIGMIESQyPACmwwQ4fEykTUjO8ex12Ru67JyzMvpBILQktaN5gqyaTKWCVrfguNtlUfkpuaFl5vUvAD4z3lcctCXDr8hOVU3DnLLVTwCA+Q97/3Og79jezrLGvRNS3/182u7jbB7pXueyT72jpvCxGd7B2z05AYH7Aos+z6PX8cFpXW) which makes use of the `nn.mouseX`, `nn.mouseY` and `nn.mouseDown` properties (here's the same example in [vanilla JavaScript](https://netnet.studio/?layout=dock-left#code/eJyNUstuwjAQvPMVe0toS6h6bAGpaumpH0COxt4klhw7tTekqOLfu04CRSBVXGxndmY2+1gE2htcTQDu4IdPgDagnwU0KOkZrLP4wvBhspiPzEWQXjcUJQYJaseCDSzh8RzIL4F311nGCmECTjhQtFaSdhaUF106HXN7/Gox0KvVtYjRDy9qTCNlOukJuoD05HdUAUhnA0HJ0SUoJ9saLWXSoyBcG4xfaaLrMpmOfGZmwUtmMyxKDHNGwlyqjO/knBRrzhoXdP+zzBfb4ExLeM0yWBAzxobM+kinFVUwhye4h6T5vhaRa46afNRUqMuKrkWnwrZO7TPRNGjVW6WNSlk1VHboR8XH0NX46rRVrsuEUusdiz91ILTo06TPySGbPAAPYLkau3k+LvItRssbnNrmH59h7LcZ1W6H0QovveKSYSaNZs3mD87P4HzIwbs67OgvsSvgwg==) which would require setting up multiple event listeners).

## platform info

Internet artists often use cutting edge and/or fringe browser features and need to confirm whether or not the user's device support these features (and provide fallback content if not). The library includes a number of methods for checking what sorts of functionality the user's device supports, here's an example which makes use of the `nn.browserInfo()` and `nn.isMobile()` methods to [write a custom platform message](https://netnet.studio/?layout=dock-left#code/eJxtkM9qg0AQxs/1KYYQUANqWnqyxktPPfQBeouaUSfsH9ldbaz47p2oBAqFZXb3+30zzExm3Sgw9wBKfRlh4gdAi9S0LoXn43Fo3xbpQrYTxZhCLfC2StfeOqrHqNLKoWJ7xRHNCgtBjYrIobR/Qc3uyNIPpvDy2i2lZi9Ltjayexd5liyXl9nKUOfAmuq0UyqWpOKr3TFfwcORe0/JARqhy0KAUnBIuCwfgQ5KOLEUl0Z/WzQfqtZBGKtC4saH//iAxpJWm0Wyxff5QzUE7CX7qUsSGIThysC1CHLRYEsFXYO/dnHRVS95BfF9qtjhzb2vK+PU85fuoTAIvSXVwH6SM4dyhmE/DfPZ8x6z/gLW3IWT) onto the screen (here's the same example in [vanilla JavaScript](https://netnet.studio/?layout=dock-left#code/eJxtVG1P2zAQ/t5fcZMQSUabANqn0lJRxAc0daAhbZraSjjJpTEkcWU7oV3T/76Lnb7AkFKnuZfHzz139kDpdYbXHYBQxGvY0B+AFPki1X24OD+v0itjirlaZmzdhyTDlTW9lErzZN2LRKGxoPCIVpTWyTK+KHpcY67eOxKK7in+F/tw+W1poLadQdDSGDQsrgeBeXUGKpJ8qRt29CRlEWkuCuBqIkKeIbheS5gn4AY3RSwFj+s3DB+eav6YigLpxWJaRFyPMxa9jlHKdT0e149UzFiI1/r+zoLVv3kRizcFNu87fZHxiWev9cMSJYMJL3jAfY1KuwWr+IJpIf1SobxZUH3ejguARF3KArQs0Vi2gJnCj+6EkdH6O/Z3XGMoiQvK+yIRhzJJaaWhZDCETxiYkAw1TMhfMj9nOkrdwBUN/TpKpcixVixhktcJl5iIVZ0rjrWWPKZ8dzScBZ43C0Yz9dWdxWdewD2oa5jO99DUz4Pgbd5OlMn0Yn6kAoUSj2AWymoK/fmZRVz4uMLILdkx8l4T5/4OHDgDl5IJrQlxHG8vkt232QeGwyE4t6Ym5+Oeh9pnofvw+LO+ixdIdVkGXhvbQDXxXwipKLPM2/cNc19lPEL3wvNfBC9cBxzPl0gHgIwOITpdcMxUvCPX6D6ZXs5hBNOGZNd8zaEP00O72HL5g+XYhXemXygVtZ1geyNnvi/V/VhQZeN2tXDS+8B/4tMZNby7QI/V0BIMAohSjF7p+EkYS1bhbsL2e72Z+fcPtEITdnra6gXweYTPlQEke462L63lqDGT6Tn1DBxrvwLbQ8P7SMC2ARtooPomqQttyX2bc3RWmnkMCeToqLieYdE6q/+cLVbrb6R1nI4tf3epuCSpcYBOEXJ70bR5IBJw7OaxiMqcht9vbiqa/5W+tdcgpT7/ESUwiVAqXizgZJNvaQm3UJ1squ1zp7nu7MX2D9PlraA=) which would require creating custom functions).

## math methods

The library also contains a collection of mathematical functions commonly used by internet artist and creative coders which are not included in the JavaScript `Math` object.

This example uses the `nn.map()` method (which itself makes use of the `nn.lerp()` and `nn.norm()` methods) to create a [gif which resizes based on the mouse movements](https://netnet.studio/?layout=dock-left#code/eJxlUctOwzAQPJOvWOXSNErjgISQSlqJCzdOXLi6tpO48qPYDm2E+HfWSYgKSJad7Mzs7Ni1D4MS+wTgYPkAn/gB0AnZdmELt1X10T2OJS79SdFhC40Sl6l07H2QzbBh1gRhkM5wF24CqZKt2cggtL8GvpKazI51NNwnN7XULXjHdqnUtBWetLLxhPESzxT7hF1KgfEUFWSS1J45eQqTyJhSS1MefbrH1iOwMLA7yaFV9kAVGAM5wRFwNb1hQVoD3NEzZOs5thPvvfDhyeAgEX52VIssctYjjkF9ABwLdsAt6zXGKlHihlehBAvWZSsMs7pma9t78SINSqp/ZXrBMgY4Sx46IHD322aSPdz/qf6opleCHKpy5iA69xoJmp6yeESvt2IZpVjci7lfMbutxxcaryimzuJ/stzqNwEnq9s=), specifically it "maps" the mouseX value from a specified given min/max range to a target min/max size for the gif (here's that same example in [vanilla JavaScript](https://netnet.studio/?layout=dock-left#code/eJx9U8uu0zAQXdOvGHVTB9KkICGkS1KJBYgFrFhwt8aepkaxXWynbYT4d8YP9bYUkCJnPI8zx3Pszod5xO0C4JuVM/wkA2CPatiHB3i52Rz3b5NLKn8Y+fwAuxHP2fV98kHt5rWwJqChdEEruhzkoxrMWgXU/jrwa9G1pWMXG24XzzqlB/BO9Eul+YC+HdTOt0I29F8STuiXHIRcUkWbSzovnDqESJq+EQNoO3l8hB422bebjAjKGjDWaWBHPk5Yg1aGFn6uyjEdhsmZEoZ1jFfQAqOUskuMr/FGdAdgEfXfcE/l8DwTeBF3d1iaHy7UvJ2cwM8RsZj8XINEH5IvGXedIpnE5X8o1V9gEpXbQUnHT8CeGvyYKPedIUli+IPjGlnMqVKcJPcBSCAaubRi0iRwQyVu/oIjimAdW5Gsq+vspBHRKCrdumlkPZyUkfbUKGPQfVUy7EmMV7f9cv2b139478o/phtM8980JZnSmlMC7ePkWb4y9YVWfWFSF8i6NLwaV5wAq7Jd2nEp3x/p+J+Up1eAdPCEo+0RVzUwrKDflqlebik2YlRU8xiRExy9inynfwPrhRxW)).

This examples uses the `nn.dist()` method to calculate the distance between the mouse and the center of a circular gif and [adjusts it's opacity](https://netnet.studio/?layout=dock-left#code/eJx9U02P0zAQvfdXjHJJupQ4u4hbWgkhIXGFS3t07WlqlNjBnqhUaP87Y7ubfgg4ZTx+783MG6fdO33eLABaM3QQvFoXZpAdBtGZQxBK1/wtQPa0LiQoXWwWrcicNihvRsoka+vB2PpHKDatyBczIsqLJ+h6t5c9WAtPYsEp5WwgYHlYg3ZqGtBS/XNCf/6OPSpyviq5qXIZwYfJKjLOQkCaxmoJvzkJkV2fjKYja3ALXlrthuq5aVbwoWmWMybQucd6dMEkkTWUch9cPxGWD5geD3QnxlGu8P5abQnvoBx/PXLJjY/UI5ruSBduPtyQX+9G016e5sk8shWBPlleR7z94uWAVYTkqWb3vnHJqw0CXkCImCgDeKnNFO7hn7eMH6UP+NVSdT937CwpzgqKd4Ietg8au79r8Pz/lNglCc5qE0hahbBHOiFaoCPC4KaAwK6l04XiDunEMjflIz2bHKMqTbTKTa1iNiltr+Eu28WvrErUNrX35vLt9twolaEzizf1y8d0/QrYc1//wz5n4NsyL8+To7zNxfw3/AEoNw/L) when the mouse hovers over it. The web has it's own 'mouseover' event to detect when oun fire when the mouse is hovering over the transparent part of the gif as well (here's the same example in [vanilla JavaScript](https://netnet.studio/?layout=dock-left#code/eJyFVE2PmzAQvedXjHLBNCkkSHtLIq2qVq3UXtpDw9GxJ4klsFnbLIuq/PcOhrAk2nYPgD1+8+Z5PtgcjGx3M4CNKk/grNjOVclP6NKTOrpUyIS+c+CF3845CDnfzTZp77NxwqrK72bkLYx2HggKW5BG1CVqnzzVaNtfWKDwxrKIAkQxYQv0UJra4Z7Aq6khDwayHGstvDIaHPq6YjH8ISN0/EmjpD8T7gf358RyLU1J5x8gW61gAevVakQ63xaYVMapQLWFiB+cKWqP0R2mwKN/g7JRtGwSpTXa3yHsx4mEBUTVyz2TN9U7RF9Rnc5+YDr3m5HqQs/0+lJRVlm1fllCtW7plXWrrL0mpE97ZZr1NSqtGaGIP3hl8S0uu8W1AdeOOEvptrpHuCfrWaBeBM846LtRZ3kz1sYildv5R03t051+sbxE1kGmEujSP0nCaxZTyCBNO0PkwHKpancL/9R1ScWtw2/as9uaxSQtMI4MgvoOLezvOPK3Oaha/6TIAwVZuxpwLRAO6BtEDf6MfbsCVTjsBhdzDDuimYSX3UQQBQt3WfZylsMADN+8TxFND5OwCXquaZ02l6m4UL7thiTJHsLxBbAgIf/DrnvgtXrDRNGqL1/fcUOHcik/P9NlvpNgpGZlUdBXmmeMlsAwhu1uCDZOMCaiUOSzfzXnE3OXx0tMP43hb/EX7S5btg==)).


<!-- https://netnet.studio/?layout=dock-left#code/eJyVVk1z0zAQvfMrdtJhGhcndgppaXByKJSBGWYYpr1wVGw5ETiSkeQ0pcN/Z/Vh16GUiIu11r63elrJ3s2Uvqvo4hnAUhR3cI8GwJqy1VrP4HWabtdv7NSS5N9XUjS8mEHFOCVytJKkYJTr4dHV2bvLs/eQPo/h6PUkv7h4BVP7kk+mk/MUJmn6PHJxRKMNfWbm6h0UQmtawNEUgRcXe5CRKEtFUcVoMkUoun49wwcnW6+yFoppJvgMSrajhSP/HDFe0N0MTt+0jCOlidSxsUrGmVo/4pOlElWjqQuh6U6PSMVW6Mlxf1S6+VtW6LUVvr11MxsiV4ybqXrnZkrB9Uixn7jBMz/Z0+AX1qLGyKTKhzbBcALp+HQaOTDAI6F/w5+3+CzxJ5iZAzQHmWGKFpaYKVrRXLsXfBW12S9sSdXQ+eAj/9KQYrBwY5Y47xPgz412aG8cgH/kHaEzD1LeNkuWG4I1Dgvy+NYKkdQtEUxC5VL7JEkdlCWDb63APLklgklfGsa9KDRCRFl8a4WJ8ksEk67xozUEMx6W5NDeCBHUhg+lvGXSXSYcA+6SRXsj6Cb58KGUq4oo7e6eNw+L6jgPdoi03lL/Qbza1cKqwzFAmkV7I0iUDx9KucSCY/BmPCzHob0RIqcNH0q5xNKX2/vnrABJntGZ+xT8b/d+ztmy0RpdKpeiqrLEv5q/eeJ/51nBtsCK+cCWksHCDlmCs3teVzkGCzd6Pwa0xSHD+KzWoGQ+H3A+3jA+/qYGCxRjHR3ChExOYFWJJamAczhJTBnLBVfItiIvrUSYYw3Pmw3WyfGPhsq7a7srIYfHbg/HUcejRFHnZv8kusQgEZklZs7C9S2lfKjvahpDKcUmxrIYA8MwaeTrJCthqNdMjS32hm2ojCCvsFcxNrYVj7yW5sQVjcRYp5AkxiR2TcZBUXQXqgcsa4VA7AJSSOBlagj4LCXZUAU1lZ7SYzCeGwbYyPjECE4vvJgbZyeewQJxEUiqG8l7EbBVwQh4YCaFPgmsr/6rc29IPURsDGkMk4c8Rb5/4YW4HbvTuxFDxHx1nj/SgrGw8WpzNoxgvngq/VFsdhO1bU7/ZoxJUVxt8Xg/MaUpp3iwecXy78cxuJD3Pf0mMC67d0PG9lvqgZbr/qUxN9pv5oPtV3tI123NDcM1V3s+UT+4zqdP5cbGcPl5lI17/9X3s+K6TBvesX7F2AWnNjd4lbtP7DdT/pVs -->
