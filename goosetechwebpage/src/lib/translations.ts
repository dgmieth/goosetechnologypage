// src/lib/translations.ts
export const translations = {
  'pt-br': {
    nav: {
      home: 'Início',
      about: 'Sobre Nós',
      products: 'Produtos',
    },
    footer: {
      privacy: 'Privacidade',
      terms: 'Termos de Serviço',
      copyright: '© 2024 Seu Site. Todos os direitos reservados.',
    },
    home: {
      title: 'Bem-vindo ao Nosso Site',
      description: 'Descubra nossos produtos incríveis',
      cta: 'Explorar Produtos',
    },
    about: {
      title: 'Sobre Nós',
      description: 'Conheça nossa história e missão',
      content: 'Somos uma empresa dedicada a fornecer soluções inovadoras para o mercado brasileiro e internacional. Nossa missão é transformar ideias em realidade através da tecnologia.',
    },
    products: {
      title: 'Nossos Produtos',
      description: 'Conheça nossa linha completa de produtos',
      viewDetails: 'Ver Detalhes',
      privacy: 'Privacidade',
      terms: 'Termos',
    },
  },
  'en-us': {
    nav: {
      home: 'Home',
      about: 'About Us',
      products: 'Products',
    },
    footer: {
      privacy: 'Privacy',
      terms: 'Terms of Service',
      copyright: '© 2024 Your Site. All rights reserved.',
    },
    home: {
      title: 'Welcome to Our Site',
      description: 'Discover our amazing products',
      cta: 'Explore Products',
    },
    about: {
      title: 'About Us',
      description: 'Learn our story and mission',
      content: 'We are a company dedicated to providing innovative solutions for the market. Our mission is to transform ideas into reality through technology.',
    },
    products: {
      title: 'Our Products',
      description: 'Discover our complete product line',
      viewDetails: 'View Details',
      privacy: 'Privacy',
      terms: 'Terms',
    },
  },
  'fr-ca': {
    nav: {
      home: 'Accueil',
      about: 'À Propos',
      products: 'Produits',
    },
    footer: {
      privacy: 'Confidentialité',
      terms: 'Conditions d\'utilisation',
      copyright: '© 2024 Votre Site. Tous droits réservés.',
    },
    home: {
      title: 'Bienvenue sur Notre Site',
      description: 'Découvrez nos produits fantastiques',
      cta: 'Explorer les Produits',
    },
    about: {
      title: 'À Propos de Nous',
      description: 'Découvrez notre histoire et notre mission',
      content: 'Nous sommes une entreprise dédiée à fournir des solutions innovantes pour le marché. Notre mission est de transformer les idées en réalité grâce à la technologie.',
    },
    products: {
      title: 'Nos Produits',
      description: 'Découvrez notre gamme complète de produits',
      viewDetails: 'Voir les Détails',
      privacy: 'Confidentialité',
      terms: 'Conditions',
    },
  },
  'es-mx': {
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      products: 'Productos',
    },
    footer: {
      privacy: 'Privacidad',
      terms: 'Términos de Servicio',
      copyright: '© 2024 Su Sitio. Todos los derechos reservados.',
    },
    home: {
      title: 'Bienvenido a Nuestro Sitio',
      description: 'Descubre nuestros productos increíbles',
      cta: 'Explorar Productos',
    },
    about: {
      title: 'Acerca de Nosotros',
      description: 'Conozca nuestra historia y misión',
      content: 'Somos una empresa dedicada a proporcionar soluciones innovadoras para el mercado. Nuestra misión es transformar ideas en realidad a través de la tecnología.',
    },
    products: {
      title: 'Nuestros Productos',
      description: 'Descubre nuestra línea completa de productos',
      viewDetails: 'Ver Detalles',
      privacy: 'Privacidad',
      terms: 'Términos',
    },
  },
} as const

export type Locale = keyof typeof translations

export function getTranslation(locale: Locale) {
  return translations[locale] || translations['en-us']
}