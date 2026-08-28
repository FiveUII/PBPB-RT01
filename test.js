fetch('https://react.dev/errors/441').then(r => r.text()).then(t => {
  const match = t.match(/<script id="__NEXT_DATA__" type="application\/json">([\s\S]+?)<\/script>/);
  if (match) {
    const data = JSON.parse(match[1]);
    console.log(JSON.stringify(data.props.pageProps, null, 2));
  }
});
