const event = events[0];
event.subcategory_id = 'funk';

const genreSwap = (event) => {
  const genreCode = event.subcategory_id;
  if (event.subcategory_id)
}

events.forEach(event => {
  const { name: { text } } = event;
  let genreCode = event.subcategory_id;

  genres.forEach(genre => {
    if (genreCode === genre.id) {
      event.subcategory_id = genre.name;
    } else if (!genreCode) {
      event.subcategory_id = 'Other';
    }
  });

  event.venue.address.city = 'Oakland';

});