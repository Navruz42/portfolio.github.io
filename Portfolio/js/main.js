const form = $('#price-form')
let formData = form.serializeJSON();
console.log(formData);

showHideBlocks();

form.on('keyup change', 'input, select, textarea', function () {
    formData = form.serializeJSON();
    console.log(formData);

    showHideBlocks();
    formData = form.serializeJSON();
    console.log(formData);

    $('#total-price').text(calculatePrice());

});

// ФУНКЦИЯ ОБНУЛЕНИЯ ВЫБОРА

function showHideBlocks() {

    // БЛОК ВЫБОРА САЙТА ИЛИ ЛЕНДИНГА

    if (formData.type == 'site') {
        $('[data-name="landing"]').hide();
        $('[data-name="pages"]').show();
        $('[name="sections"]').val('0');
    } else {
        $('[data-name="pages"]').hide();
        $('[data-name="landing"]').show();

        $('[name="pages-unique"]').val('0');
        $('[name="pages-general"]').val('0');
    }

    //БЛОК МОБИЛЬНАЯ АДАПТИВНОСТЬ
    
    if (formData.mobile == 'on') {
        $('[data-name="mobile"]').show();
    } else {
        $('[data-name="mobile"]').hide();
        $('[name="mobile-number"]')[0].checked = true;
        $('[name="mobile-number"]')[1].checked = false;
        $('[name="mobile-number"]')[2].checked = false;
    }
}

function calculatePrice () {
    let totalPrice = 0;
    totalPrice = 
        formData['pages-unique'] * 4000 +
        formData['pages-general'] * 2500 +
        formData['sections'] * 2000 +
        formData['carousel'] * 1200 +
        formData['modals'] * 900 +
        formData['forms'] * 1500;
    console.log(totalPrice);    

    //Мобильный мультипликатор

    let multiplicatorMobile = 1;
    if ( formData['mobile-number'] == 2 ) {
        multiplicatorMobile = 1.3
    } else if ( formData['mobile-number'] == 3 ) {
        multiplicatorMobile = 1.5
    }
    console.log(multiplicatorMobile);

    let mPixelPerfect = 1;
    if ( formData['pixelPerfect'] == 'on' ) {
        mPixelPerfect = 1.2;
    }
    
    let mRetinaReady = 1;
    if ( formData['retinaReady'] == 'on' ) {
        mRetinaReady = 1.2;
    }
    
    let mGooglePageSpeed = 1;
    if ( formData['googlePageSpeed'] == 'on' ) {
        mGooglePageSpeed = 1.2;
    }
   
    let mUrgentOrder = 1;
    if ( formData['urgentOrder'] == 'on' ) {
        mUrgentOrder = 1.5;
    }
   
    totalPrice = totalPrice * multiplicatorMobile * mPixelPerfect * mRetinaReady * mGooglePageSpeed * mUrgentOrder;
    
    console.log(totalPrice);

    return totalPrice;
}