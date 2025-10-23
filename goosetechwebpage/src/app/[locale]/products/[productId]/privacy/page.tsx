// src/app/[locale]/products/[productId]/privacy/page.tsx
import { Metadata } from 'next'
import { Locale, getTranslation } from '@/lib/translations'
import { products } from '@/lib/products'
import { notFound } from 'next/navigation'
import { translations } from '@/lib/translations';

export async function generateStaticParams() {
  const locales: Locale[] = ['pt-br', 'en-us', 'fr-ca', 'es-mx']
  const params = []

  for (const locale of locales) {
    for (const product of products) {
      params.push({
        locale,
        productId: product.id,
      })
    }
  }

  return params
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>
}): Promise<Metadata> {
  const { locale, productId } = await params
  const product = products.find((p) => p.id === productId)
  if (!product) notFound()

  const t = getTranslation(locale)

  return {
    title: `${product.name} - ${t.products.privacy}`,
    description: `Política de Privacidade de ${product.name}`,
  }
}

export default async function PrivacyPolicy({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>
}) {
  const { locale, productId } = await params
  const product = products.find((p) => p.id === productId)
  if (!product) notFound()

  const t = getTranslation(locale)

  const privacyTexts = {
    'pt-br': `Política de Privacidade de ${product.name}

Última atualização: 2024

1. Informações que Coletamos
Coletamos informações que você nos fornece diretamente ao usar ${product.name}. Isso pode incluir nome, e-mail, e outras informações de contato.

2. Como Usamos suas Informações
Usamos as informações coletadas para:
- Melhorar nossos serviços
- Comunicar com você sobre atualizações
- Personalizar sua experiência

3. Compartilhamento de Informações
Não vendemos ou compartilhamos suas informações pessoais com terceiros sem seu consentimento.

4. Segurança
Implementamos medidas de segurança para proteger seus dados contra acesso não autorizado.

5. Seus Direitos
Você tem o direito de acessar, corrigir ou excluir suas informações pessoais a qualquer momento.

6. Contato
Para questões sobre esta política, entre em contato conosco através do nosso site.`,
    'en-us': `Privacy Policy for ${product.name}

Last updated: 2024

1. Information We Collect
We collect information you provide directly to us when using ${product.name}. This may include name, email, and other contact information.

2. How We Use Your Information
We use the collected information to:
- Improve our services
- Communicate with you about updates
- Personalize your experience

3. Information Sharing
We do not sell or share your personal information with third parties without your consent.

4. Security
We implement security measures to protect your data against unauthorized access.

5. Your Rights
You have the right to access, correct, or delete your personal information at any time.

6. Contact
For questions about this policy, contact us through our website.`,
    'fr-ca': `Politique de Confidentialité de ${product.name}

Dernière mise à jour : 2024

1. Informations que nous collectons
Nous collectons les informations que vous nous fournissez directement lors de l'utilisation de ${product.name}. Cela peut inclure le nom, l'e-mail et d'autres informations de contact.

2. Comment nous utilisons vos informations
Nous utilisons les informations collectées pour :
- Améliorer nos services
- Communiquer avec vous sur les mises à jour
- Personnaliser votre expérience

3. Partage d'informations
Nous ne vendons ni ne partageons vos informations personnelles avec des tiers sans votre consentement.

4. Sécurité
Nous mettons en œuvre des mesures de sécurité pour protéger vos données contre tout accès non autorisé.

5. Vos droits
Vous avez le droit d'accéder, de corriger ou de supprimer vos informations personnelles à tout moment.

6. Contact
Pour toute question concernant cette politique, contactez-nous via notre site web.`,
    'es-mx': `Política de Privacidad de ${product.name}

Última actualización: 2024

1. Información que Recopilamos
Recopilamos la información que nos proporciona directamente al usar ${product.name}. Esto puede incluir nombre, correo electrónico y otra información de contacto.

2. Cómo Usamos su Información
Utilizamos la información recopilada para:
- Mejorar nuestros servicios
- Comunicarnos con usted sobre actualizaciones
- Personalizar su experiencia

3. Compartir Información
No vendemos ni compartimos su información personal con terceros sin su consentimiento.

4. Seguridad
Implementamos medidas de seguridad para proteger sus datos contra acceso no autorizado.

5. Sus Derechos
Tiene derecho a acceder, corregir o eliminar su información personal en cualquier momento.

6. Contacto
Para preguntas sobre esta política, contáctenos a través de nuestro sitio web.`,
  }

  return (
    <section className="page-content">
      <h1>{t.products.privacy} - {product.name}</h1>
      <div className="legal-content">
        {privacyTexts[locale].split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}