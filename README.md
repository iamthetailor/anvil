# AnvilWeb Landing Page

A modern, responsive landing page built with Next.js, React, and Tailwind CSS. Designed for easy deployment to Vercel.

## Features

- ⚡ **Lightning Fast** - Built with Next.js for optimal performance
- 🔒 **Secure** - Enterprise-grade security features
- 📱 **Mobile First** - Responsive design for all devices
- 🚀 **Scalable** - Built to handle millions of users
- 🎨 **Beautiful UI** - Modern, clean design
- ⚙️ **Easy Deploy** - One-click deployment to Vercel

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployment

### Deploy to Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Vercel will automatically detect it's a Next.js app and configure the build settings
4. Your app will be deployed and you'll get a live URL

### Manual Deployment

You can also deploy manually:

```bash
npm run build
npm start
```

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Deployment**: Vercel

## Project Structure

```
├── app/                 # Next.js app directory
│   ├── globals.css     # Global styles
│   ├── layout.tsx      # Root layout
│   └── page.tsx        # Home page
├── components/         # React components
│   ├── Hero.tsx        # Hero section
│   ├── Features.tsx    # Features section
│   ├── CTA.tsx         # Call-to-action section
│   └── Footer.tsx      # Footer component
├── public/             # Static assets
└── ...config files
```

## Customization

The landing page is fully customizable:

1. **Content**: Edit the text in each component
2. **Colors**: Modify the Tailwind classes in the components
3. **Layout**: Adjust the component structure
4. **Styling**: Update the CSS classes or add custom styles

## License

MIT License - feel free to use this template for your projects!