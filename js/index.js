function jsonFetch() {
    fetch('http://localhost:3000/movies', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: 'Batman: Returns',
            genre: 'Action',
            rating: 10
        })
    }).then(result => result.json()).then(data => {
        console.log(data)
    });
}
