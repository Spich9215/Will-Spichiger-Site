// client/src/data/credentials.ts
// Data source for the Credentials page. Add a new object to this array whenever
// a new certificate, specialization, or degree is earned.

export interface Credential {
  id: string;
  issuingOrganization: string;
  issueDate: string; // ISO format YYYY-MM-DD, used for sorting
  expirationDate?: string; // ISO format YYYY-MM-DD, if the credential can expire
  credentialName: string;
  type: 'Degree' | 'Certification' | 'Specialization' | 'Course';
  skills: string[];
  description: string;
  estimatedTimeCommitment: string;
  credentialUrl?: string;
  thumbnail: string; // small icon shown in the table
  fullImage: string; // larger image shown when the icon is enlarged
  imageStyle?: 'badge'; // 'badge' = transparent-background badge art: shown whole (not cropped) and smaller in the modal
  documentUrl?: string; // optional downloadable source document (e.g. a certified PDF)
  verificationSteps?: string[]; // optional how-to-verify steps shown in the enlarged view
}

export const credentials: Credential[] = [
  {
    id: 'ut-austin-ba',
    issuingOrganization: 'The University of Texas at Austin',
    issueDate: '2014-05-17',
    credentialName: 'Bachelor of Arts - Economics',
    type: 'Degree',
    skills: ['Critical Thinking', 'Research & Writing', 'Liberal Arts Foundation'],
    description:
      "Undergraduate degree conferred by the University of Texas at Austin, issued by the Board of Regents upon recommendation of the faculty. Issued as a Certified Electronic Diploma (CeDiploma); verify with CeDiD 26EE-V5TG-WXR3 on the UT Austin Registrar's validation page.",
    estimatedTimeCommitment: '4 years (full-time)',
    credentialUrl: 'https://registrar.utexas.edu/services/cediploma/cediploma-validation',
    thumbnail: '/credentials/thumbs/ut-austin-diploma.jpg',
    fullImage: '/credentials/full/ut-austin-diploma.jpg',
    documentUrl: '/credentials/docs/ut-austin-cediploma.pdf',
    verificationSteps: [
      'Note the CeDiD printed in the top-left corner of the diploma: 26EE-V5TG-WXR3.',
      "Open the UT Austin Registrar's CeDiploma validation page (link below) and enter the CeDiD to confirm the diploma with the university.",
      'Optionally, download the certified PDF and open it in Adobe Acrobat/Reader: a "Certified by Credentialing Services, Paradigm, Inc." ribbon confirms the document is unaltered since issuance. Do not trust it if any other symbol is displayed.',
    ],
  },
  {
    id: 'python-for-everybody',
    issuingOrganization: 'Coursera / University of Michigan',
    issueDate: '2018-12-21',
    credentialName: 'Python for Everybody',
    type: 'Specialization',
    skills: ['Python', 'Data Structures', 'Web APIs', 'Databases (SQLite)'],
    description:
      '5-course specialization covering Python fundamentals, data structures, working with web APIs, and databases, culminating in a capstone application for data retrieval, processing, and visualization.',
    estimatedTimeCommitment: '~2 months at 10 hrs/week (~80 hrs)',
    credentialUrl: 'https://coursera.org/verify/specialization/2EGASU5QCDZE',
    thumbnail: '/credentials/thumbs/python-for-everybody.jpg',
    fullImage: '/credentials/full/python-for-everybody.jpg',
  },
  {
    id: 'palo-alto-cybersecurity',
    issuingOrganization: 'Coursera / Palo Alto Networks',
    issueDate: '2019-02-14',
    credentialName: 'Palo Alto Networks Cybersecurity',
    type: 'Specialization',
    skills: ['Cybersecurity Fundamentals', 'Next-Gen Firewall Administration', 'NICE / NIST Framework'],
    description:
      '5-course specialization preparing for cybersecurity careers, with an emphasis on administering the Palo Alto Networks Next-Generation Firewall and mapping learning objectives to the U.S. NICE/NIST framework.',
    estimatedTimeCommitment: '~4 weeks at 10 hrs/week (~40 hrs)',
    credentialUrl: 'https://coursera.org/verify/specialization/263FB8MYFJZE',
    thumbnail: '/credentials/thumbs/cybersecurity.jpg',
    fullImage: '/credentials/full/cybersecurity.jpg',
  },
  {
    id: 'big-data',
    issuingOrganization: 'Coursera / UC San Diego',
    issueDate: '2020-07-09',
    credentialName: 'Big Data',
    type: 'Specialization',
    skills: ['Big Data Analytics', 'Predictive Modeling', 'Graph Analytics', 'Splunk'],
    description:
      '6-course specialization on the tools and systems used by big data scientists and engineers, including predictive modeling and graph analytics, with a capstone project developed in partnership with Splunk.',
    estimatedTimeCommitment: '~3 months at 10 hrs/week (~104 hrs)',
    credentialUrl: 'https://coursera.org/verify/specialization/7HB6JNFNJBPD',
    thumbnail: '/credentials/thumbs/big-data.jpg',
    fullImage: '/credentials/full/big-data.jpg',
  },
  {
    id: 'python-3-programming',
    issuingOrganization: 'Coursera / University of Michigan',
    issueDate: '2020-07-22',
    credentialName: 'Python 3 Programming',
    type: 'Specialization',
    skills: ['Python 3', 'OOP & Class Inheritance', 'List Comprehensions', 'API Querying'],
    description:
      '5-course specialization covering Python 3 fundamentals through intermediate topics such as keyword parameters, list comprehensions, lambda expressions, and class inheritance.',
    estimatedTimeCommitment: '~3 months at 10 hrs/week (~120 hrs)',
    credentialUrl: 'https://coursera.org/verify/specialization/F9PCFHJQAHA7',
    thumbnail: '/credentials/thumbs/python-3-programming.jpg',
    fullImage: '/credentials/full/python-3-programming.jpg',
  },
  {
    id: 'statistics-with-python',
    issuingOrganization: 'Coursera / University of Michigan',
    issueDate: '2020-09-05',
    credentialName: 'Statistics with Python',
    type: 'Specialization',
    skills: ['Statistical Analysis', 'Data Visualization', 'Inferential Statistics', 'Statistical Modeling'],
    description:
      '3-course specialization on beginning and intermediate statistical analysis concepts, using Python for data summarization, visualization, estimation, and modeling.',
    estimatedTimeCommitment: '~1 month at 10 hrs/week (~40 hrs)',
    credentialUrl: 'https://coursera.org/verify/specialization/T4FRCDGXXRQH',
    thumbnail: '/credentials/thumbs/statistics-with-python.jpg',
    fullImage: '/credentials/full/statistics-with-python.jpg',
  },
  {
    id: 'aws-fundamentals',
    issuingOrganization: 'Coursera / Amazon Web Services',
    issueDate: '2021-01-03',
    credentialName: 'AWS Fundamentals',
    type: 'Specialization',
    skills: ['Core AWS Services', 'Cloud Security', 'Migration Strategy', 'Serverless Applications'],
    description:
      '4-course specialization covering core AWS services, key security concepts, strategies for migrating existing workloads to AWS, and building/deploying serverless applications.',
    estimatedTimeCommitment: '~4 weeks at 10 hrs/week (~40 hrs)',
    credentialUrl: 'https://coursera.org/verify/specialization/SE3WTXQQ6DHE',
    thumbnail: '/credentials/thumbs/aws-fundamentals.jpg',
    fullImage: '/credentials/full/aws-fundamentals.jpg',
  },
  {
    id: 'aws-saa',
    issuingOrganization: 'Amazon Web Services',
    issueDate: '2021-01-19',
    expirationDate: '2024-01-19',
    credentialName: 'AWS Certified Solutions Architect - Associate',
    type: 'Certification',
    skills: [
      'Resilient Architecture Design',
      'High-Performing Architectures',
      'Secure Applications & Architectures',
      'Cost-Optimized Architectures',
    ],
    description:
      'Industry certification validating the ability to design distributed systems on AWS. Passed. Validation Number: WKWGZX1JL2R111GC.',
    estimatedTimeCommitment: '~40-80 hrs of prep (varies by experience)',
    credentialUrl: 'https://aws.amazon.com/verification',
    thumbnail: '/credentials/thumbs/aws-saa-badge.png',
    fullImage: '/credentials/full/aws-saa-badge.png',
    imageStyle: 'badge',
  },
  {
    id: 'stevens-ms-cs',
    issuingOrganization: 'Stevens Institute of Technology',
    issueDate: '2021-05-26',
    credentialName: 'Master of Science - Computer Science',
    type: 'Degree',
    skills: ['Computer Science Fundamentals', 'Algorithms', 'Software Engineering', 'Graduate Research'],
    description:
      'Graduate degree conferred by Stevens Institute of Technology under the authority of the Trustees, issued on recommendation of the faculty.',
    estimatedTimeCommitment: 'Graduate program (part-time/full-time coursework)',
    credentialUrl: 'https://www.parchment.com/lp/award/634de3e2-52c3-4266-8fe7-806657ac9a06',
    thumbnail: '/credentials/thumbs/stevens-ms-cs.jpg',
    fullImage: '/credentials/full/stevens-ms-cs.jpg',
  },
  {
    id: 'aws-security-specialty',
    issuingOrganization: 'Coursera / Packt',
    issueDate: '2026-01-21',
    credentialName: 'SCS-C02: AWS Certified Security - Specialty',
    type: 'Specialization',
    skills: ['AWS Security Architecture', 'IAM', 'Data Protection', 'Logging & Monitoring', 'Incident Response'],
    description:
      '3-course specialization covering security across AWS hosts, networks, and the edge; protecting data with advanced logging and monitoring; and managing incident response, IAM, and AWS service security, aligned with the SCS-C02 exam domains.',
    estimatedTimeCommitment: '~1 month at 10 hrs/week (~40 hrs)',
    credentialUrl: 'https://coursera.org/verify/specialization/T51WF6K4LAON',
    thumbnail: '/credentials/thumbs/aws-security-specialty.jpg',
    fullImage: '/credentials/full/aws-security-specialty.jpg',
  },
  {
    id: 'udemy-generative-ai-aws',
    issuingOrganization: 'Udemy',
    issueDate: '2026-07-31',
    credentialName: 'Ultimate AWS Certified Generative AI Developer Professional',
    type: 'Course',
    skills: ['Generative AI on AWS', 'Amazon Bedrock', 'Prompt Engineering', 'AI/ML Application Development'],
    description:
      'Course covering how to build generative AI applications on AWS, including working with foundation models, prompt engineering, and AWS AI/ML services, taught by AWS-certified instructors Stephane Maarek and Frank Kane (Sundog Education).',
    estimatedTimeCommitment: '25.5 total hours',
    credentialUrl: 'https://ude.my/UC-9a6e46a3-7880-42f2-a213-1bd3a0513765',
    thumbnail: '/credentials/thumbs/udemy-generative-ai-developer.jpg',
    fullImage: '/credentials/full/udemy-generative-ai-developer.jpg',
  },
  {
    id: 'anthropic-claude-api',
    issuingOrganization: 'Anthropic',
    issueDate: '2026-09-18',
    credentialName: 'Claude with the Anthropic API',
    type: 'Course',
    skills: ['Anthropic API', 'Claude Prompt Engineering', 'Tool Use', 'LLM Application Development'],
    description:
      'Course covering how to build applications with Claude using the Anthropic API, including prompt engineering, tool use, and other core patterns for working with Claude programmatically.',
    estimatedTimeCommitment: 'Self-paced course (hours not listed on certificate)',
    thumbnail: '/credentials/thumbs/anthropic-claude-api.jpg',
    fullImage: '/credentials/full/anthropic-claude-api.jpg',
  },
  {
    id: 'aws-genai-developer-pro',
    issuingOrganization: 'Amazon Web Services',
    issueDate: '2026-10-01',
    expirationDate: '2029-10-01',
    credentialName: 'AWS Certified Generative AI Developer - Professional',
    type: 'Certification',
    skills: [
      'Foundation Model Integration',
      'Amazon Bedrock',
      'Agentic AI',
      'AI Safety & Governance',
      'GenAI Cost & Performance Optimization',
    ],
    description:
      'Professional-level certification (AIP-C01) validating the ability to design and build generative AI solutions on AWS: integrating foundation models into applications and business workflows, implementing agentic AI, prompt engineering, cost and performance optimization, and security and responsible AI governance. Passed.',
    estimatedTimeCommitment: 'Self-study exam prep, incl. a 25.5-hr course',
    credentialUrl: 'https://www.credly.com/badges/fc77e8a7-f7c3-4e4e-9654-8d2931b77e18',
    thumbnail: '/credentials/thumbs/aws-genai-developer-pro-badge.png',
    fullImage: '/credentials/full/aws-genai-developer-pro-badge.png',
    imageStyle: 'badge',
  },
];
