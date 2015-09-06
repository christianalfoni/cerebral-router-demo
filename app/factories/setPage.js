export default function (page) {

  function setPage (input, state) {
    state.set('page', page);
  }

  return setPage;

};
