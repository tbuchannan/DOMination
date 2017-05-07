document.addEventListener('DOMContentLoaded', () => {

  $l('.addItemButton').on('click', () => {

    let list = $l('ul');
    let input = $l('.addItemInput').els[0].value;
    if ( input.length > 0 ) {
      list.append(
        "<li class='items'>" + input +
        " <button class='button removeItem'>Remove Item</button>" +
        "</li>");

      $l('.addItemInput').els[0].value = '';
    }

    $l(".removeItem").on('click', (e) => {
      $l(e.currentTarget).parent().els[0].remove();
    });
  });
});
