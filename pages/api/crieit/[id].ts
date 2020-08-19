import { getCrieitBadge } from '../../../components/scraper'

type response={
    exp:number,
    articles: number,
    ranksObj:object
}

export default async function (req, res) {
    try {
      console.log(req.query.id);
      const crieitInfo:response = await getCrieitBadge(req.query.id);
      res.statusCode = 200;
      res.end(JSON.stringify(crieitInfo));
    } catch (e) {
      res.statusCode = 500;
      res.setHeader("Content-Type", "text/html");
      res.end("<h1>Server Error</h1><p>Sorry, there was a problem</p>");
      console.error(e.message);
    }
  };