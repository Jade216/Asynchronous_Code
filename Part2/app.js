$(function(){
    let baseURL = 'https://deckofcardsapi.com/api/deck';

    $.getJson(`${baseURL}/new/draw/`)
    .then(data => {
        let {suit, value} = data.card[0];
        console.log(`${value} of ${suit}`);
    });


    let firstCard = null;
    $.getJson(`${baseURL}/new/draw/`)
    .then(data => {
        firstCard = data.cards[0];
        let deckId = data.deck_id;
        return $.getJson(`${baseURL}/${deckId}/draw/`);
    }).then(data => {
        let secondCard = data.cards[0];
        [firstCard, secondCard].forEach(function(card){
            console.log(`${card.value} of ${card.suit}`);
        });
    });



    let deckId = null;
    let $btn = $('button');
    let $cardArea = $('#card-area');

    $.getJson(`${baseURL}/new/shuffle/`)
    .then( data => {
        deckId = data.deck_id;
        $btn.show();
    });

    $btn.on('click', function(){
        $.getJson(`${baseURL}/${deckId}/draw/`)
        .then( data => {
            let cardSrc = data.cards[0].image;
            let angle = Math.random() * 90 -45;
            let randomX = Math.random() * 40 -20;
            let randomY = Math.random() * 40 - 20;
            $cardArea.append(
                $('<img>',{src:cardSrc, css:{
                    transform:`translate(${randomX}px, ${randomY}px) rotate(${angle}deg)`
                }}
            ));
            if (data.remaining === 0) $btn.remove();
        });
    });
})