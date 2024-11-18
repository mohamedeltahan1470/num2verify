import * as React from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Markdown from '../modules/components/Markdown';
import { Typography } from '@mui/material';
import PageTitle from '../modules/primitives/PageTitle';

export default function Privacy() {
  const privacyPolicy = `
**Privacy Policy**

**Effective Date: 10/10/2024**

Num2Verify ("we", "our", or "us") operates [num2verify.com] (the "Site"). This page informs you of our policies regarding the collection, use, and disclosure of Personal Information when you use our Site.

### Information We Collect
- **Personal Information**: We collect personal information such as your name, email address when you use forms for registeration.
- **Usage Data**: We may collect information about how the Site is accessed and used, including your IP address, browser type, and pages visited.

### How We Use Your Information
We use the information we collect in the following ways:
- To provide and maintain our Site
- To notify you about changes to our Site
- To allow you to participate in interactive features
- To provide customer support
- To gather analysis or valuable information so we can improve our Site

### Data Sharing
We may share your information with third parties only in the following circumstances:
- With your consent
- To comply with legal obligations
- To protect and defend our rights

### User Rights
You have the right to:
- Access, update, or delete your personal data
- Withdraw consent at any time where we rely on your consent

### Data Security
We take reasonable steps to protect your Personal Information, but remember that no method of transmission over the internet or method of electronic storage is 100% secure.

### Changes to This Privacy Policy
We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page.

### Contact Us
If you have any questions about this Privacy Policy, please contact us:
- Email: num2verify@gmail.com
- Address: Beni Suef, Egypt
  `;

  return (
      <Container>
        <Box sx={{ mt: 7, mb: 12 }}>
          <PageTitle>
            Privacy
          </PageTitle>
          <Markdown>{privacyPolicy}</Markdown>
        </Box>
      </Container>
  );
}
