import Spider from "./Spider.js";
import { $ } from "./HTMLParser.js";

export default class JSGCSpider extends Spider {
  model = {
    announcements: 'tr[height="25"]'
  };

  before_extract(pageHTML: string) {
    return pageHTML.replace(/<TR height=\d*>/gim, "<tr height=25>");
  }

  parse(pageElements: Object) {
    let announcements = [];

    let announcementsLength = pageElements.announcements.length;

    for (let i = 0; i < announcementsLength; i++) {
      let announcement = $(pageElements.announcements[i]);

      let a = announcement.find("a");
      let title = a.text();
      let href = a.attr("href");
      let date = announcement.find('td[align="right"]').text();

      announcements.push({ title: title, date: date, href: href });
    }

    return announcements;
  }
}
