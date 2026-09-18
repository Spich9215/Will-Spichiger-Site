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
}

export const credentials: Credential[] = [
  {
    id: 'ut-austin-ba',
    issuingOrganization: 'The University of Texas at Austin',
    issueDate: '2014-05-17',
    credentialName: 'Bachelor of Arts',
    type: 'Degree',
    skills: ['Critical Thinking', 'Research & Writing', 'Liberal Arts Foundation'],
    description:
      "Undergraduate degree conferred by the University of Texas at Austin, issued by the Board of Regents upon recommendation of the faculty.",
    estimatedTimeCommitment: '4 years (full-time)',
    thumbnail: '/credentials/thumbs/ut-austin-diploma.jpg',
    fullImage: '/credentials/full/ut-austin-diploma.jpg',
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
      'Industry certification validating the ability to design distributed systems on AWS. Passed with a scaled score of 795/1000 (720 required). Validation Number: WKWGZX1JL2R111GC.',
    estimatedTimeCommitment: '~40-80 hrs of prep (varies by experience)',
    credentialUrl: 'https://aws.amazon.com/verification',
    thumbnail: '/credentials/thumbs/aws-saa-badge.jpg',
    fullImage: '/credentials/full/aws-saa-badge.jpg',
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
];
