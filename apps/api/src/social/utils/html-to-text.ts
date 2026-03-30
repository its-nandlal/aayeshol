export function htmlToLinkedInText(html: string): string {
  return (
    html
      // Pehle \n remove karo jo TipTap ne add kiye hain
      .replace(/\n/g, '')
      .replace(/<br\s*\/?>/gi, '\n')
      // Paragraph break — single newline (editor jaisi)
      .replace(/<\/p>\s*<p[^>]*>/gi, '\n')
      .replace(/^<p[^>]*>/, '')
      .replace(/<\/p>$/, '')
      .replace(/<\/?(strong|b|em|i)[^>]*>/gi, '')
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&nbsp;/g, ' ')
      .replace(/&quot;/g, '"')
      .replace(/\n{3,}/g, '\n\n')
      .trim()
  );
}
