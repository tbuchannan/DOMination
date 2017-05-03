document.addEventListener('DOMContentLoaded', () => {

  window.$l('.addItemButton').on('click', () => {

    let list = window.$l('ul');
    let input = window.$l('.addItemInput').els[0].value;
    if ( input.length > 0 ) {
      list.append(
        "<li class='items'>" + input +
        " <button class='button removeItem'>Remove Item</button>" +
        "</li>");

      window.$l('.addItemInput').els[0].value = '';
    }

    window.$l(".removeItem").on('click', (e) => {
      window.$l(e.currentTarget).parent().els[0].remove();
    });
  });
});
