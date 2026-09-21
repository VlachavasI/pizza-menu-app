# Description

The following design: 
![design](./design.png)
depicts a part of an online ordering menu.

* Imagine a Pizza menu category that has a few items, and each item has sizes and prices for each size
* Each item card on the design works **_like_** a bootstrap accordion (see https://getbootstrap.com/docs/5.0/components/accordion/)
* When you click on the item name the size/price section expands. At the same time the other item cards collapse
* When you uncheck a size, the related price is set to 0.00, and the input above is disabled
* User can edit the price (only numbers are allowed). Price changes **persist after page refresh**
* Each item card has an "Undo" button/function, which is **only displayed** if the user has made any changes to item since the app initialized. When clicked, the selected item's state reverts to the initial one (**what we had when the page first loaded**)

Given the data and their models:
[data.ts](./data.ts)

1. Fork this repository on your account
2. Build a web app that matches the above design and functionality described above, using the available data
3. Send us the forked repo with your changes when you are ready

## Notes
1. You can use any of the recent Angular versions (at least v15+)
2. Avoid using any 3d-party dependencies, like state management tools, component frameworks, or CSS libraries. Write your own styles to match the mockup design
3. Try to make the app accessible based on the [WCAG 2.1 (AA) standards](https://www.w3.org/WAI/standards-guidelines/wcag/)
4. You can import or copy the data from `data.ts` file any way you want
5. You can use any of the available browser features/APIs to persist data between page reloads
6. The relations between the data use a classic relational approach (id based)
7. The undo function is performed **per item** and should work for _any item list length_
8. Try to use best practices as you would always do. Don't focus only on functionality or styling only
# pizza-menu-app
