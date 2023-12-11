import MarkdownIt from 'markdown-it';

const markdown = new MarkdownIt();

export const renderMd = (text: string) =>
  text ? markdown.render(text) : '';
