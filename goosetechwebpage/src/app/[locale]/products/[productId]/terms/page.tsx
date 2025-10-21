// src/app/[locale]/products/[productId]/terms/page.tsx
import { Metadata } from 'next'
import { Locale, getTranslation } from '@/lib/translations'
import { products } from '@/lib/products'
import { notFound } from 'next/navigation'

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
    title: `${product.name} - ${t.products.terms}`,
    description: `Termos de Serviço de ${product.name}`,
  }
}

export default async function TermsOfService({
  params,
}: {
  params: Promise<{ locale: Locale; productId: string }>
}) {
  const { locale, productId } = await params
  const product = products.find((p) => p.id === productId)
  if (!product) notFound()

  const t = getTranslation(locale)

  const termsTexts = {
    'pt-br': `Termos de Serviço de ${product.name}

Última atualização: 2024

1. Aceitação dos Termos
Ao usar ${product.name}, você concorda com estes termos de serviço. Se você não concorda, não use o serviço.

2. Licença de Uso
Concedemos a você uma licença limitada, não exclusiva e não transferível para usar nosso serviço.

3. Restrições de Uso
Você concorda em não:
- Usar o serviço para fins ilegais
- Tentar acessar áreas restritas do sistema
- Interferir no funcionamento do serviço

4. Propriedade Intelectual
Todo o conteúdo e funcionalidades do ${product.name} são propriedade exclusiva da empresa.

5. Limitação de Responsabilidade
Não somos responsáveis por danos indiretos, incidentais ou consequenciais resultantes do uso do serviço.

6. Modificações
Reservamos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação.

7. Rescisão
Podemos suspender ou encerrar seu acesso ao serviço a qualquer momento, sem aviso prévio, por violação destes termos.

8. Lei Aplicável
Estes termos são regidos pelas leis brasileiras.`,
    'en-us': `Terms of Service for ${product.name}

Last updated: 2024

1. Acceptance of Terms
By using ${product.name}, you agree to these terms of service. If you do not agree, do not use the service.

2. License Grant
We grant you a limited, non-exclusive, non-transferable license to use our service.

3. Usage Restrictions
You agree not to:
- Use the service for illegal purposes
- Attempt to access restricted areas of the system
- Interfere with the service's operation

4. Intellectual Property
All content and functionality of ${product.name} are the exclusive property of the company.

5. Limitation of Liability
We are not liable for indirect, incidental, or consequential damages resulting from use of the service.

6. Modifications
We reserve the right to modify these terms at any time. Changes take effect immediately upon publication.

7. Termination
We may suspend or terminate your access to the service at any time, without notice, for violation of these terms.

8. Governing Law
These terms are governed by US federal law.`,
    'fr-ca': `Conditions d'utilisation de ${product.name}

Dernière mise à jour : 2024

1. Acceptation des Conditions
En utilisant ${product.name}, vous acceptez ces conditions d'utilisation. Si vous n'êtes pas d'accord, n'utilisez pas le service.

2. Licence d'Utilisation
Nous vous accordons une licence limitée, non exclusive et non transférable pour utiliser notre service.

3. Restrictions d'Utilisation
Vous acceptez de ne pas :
- Utiliser le service à des fins illégales
- Tenter d'accéder aux zones restreintes du système
- Interférer avec le fonctionnement du service

4. Propriété Intellectuelle
Tout le contenu et les fonctionnalités de ${product.name} sont la propriété exclusive de l'entreprise.

5. Limitation de Responsabilité
Nous ne sommes pas responsables des dommages indirects, accessoires ou consécutifs résultant de l'utilisation du service.

6. Modifications
Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications entrent en vigueur immédiatement après publication.

7. Résiliation
Nous pouvons suspendre ou résilier votre accès au service à tout moment, sans préavis, en cas de violation de ces conditions.

8. Loi Applicable
Ces conditions sont régies par les lois canadiennes.`,
    'es-mx': `Términos de Servicio de ${product.name}

Última actualización: 2024

1. Aceptación de los Términos
Al usar ${product.name}, usted acepta estos términos de servicio. Si no está de acuerdo, no use el servicio.

2. Concesión de Licencia
Le otorgamos una licencia limitada, no exclusiva y no transferible para usar nuestro servicio.

3. Restricciones de Uso
Usted acepta no:
- Usar el servicio para fines ilegales
- Intentar acceder a áreas restringidas del sistema
- Interferir con el funcionamiento del servicio

4. Propiedad Intelectual
Todo el contenido y funcionalidades de ${product.name} son propiedad exclusiva de la empresa.

5. Limitación de Responsabilidad
No somos responsables por daños indirectos, incidentales o consecuentes resultantes del uso del servicio.

6. Modificaciones
Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios entran en vigor inmediatamente después de la publicación.

7. Terminación
Podemos suspender o terminar su acceso al servicio en cualquier momento, sin previo aviso, por violación de estos términos.

8. Ley Aplicable
Estos términos se rigen por las leyes mexicanas.`,
  }

  return (
    <section className="page-content">
      <h1>{t.products.terms} - {product.name}</h1>
      <div className="legal-content">
        {termsTexts[locale].split('\n\n').map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </div>
    </section>
  )
}