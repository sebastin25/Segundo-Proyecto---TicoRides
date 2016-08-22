var autocomplete, autocomplete2;

function initAutocomplete() {

  autocomplete = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete')),
      {
          componentRestrictions: {
              country: 'cr'
          },
          types: ['address']
      });

  autocomplete.addListener('place_changed', fillInAddress);

  autocomplete2 = new google.maps.places.Autocomplete(
      (document.getElementById('autocomplete2')),
      {
          componentRestrictions: {
              country: 'cr'
          },
          types: ['address']
      });

  autocomplete2.addListener('place_changed', fillInAddress);
}

function fillInAddress() {
    console.log('autocomplete', autocomplete.getPlace());
    console.log('autocomplete2', autocomplete2.getPlace());

}