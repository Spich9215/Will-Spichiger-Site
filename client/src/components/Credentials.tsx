// client/src/components/Credentials.tsx
import React, { useMemo, useState } from 'react';
import { credentials as allCredentials, type Credential } from '../data/credentials';
import './Credentials.css';

type SortKey = 'issuingOrganization' | 'issueDate' | 'credentialName';
type SortDirection = 'asc' | 'desc';

const formatDate = (iso: string): string =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

const isExpired = (expirationDate?: string): boolean =>
  !!expirationDate && new Date(`${expirationDate}T00:00:00`) < new Date();

const Credentials: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('All');
  const [orgFilter, setOrgFilter] = useState<string>('All');
  const [sortKey, setSortKey] = useState<SortKey>('issueDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selected, setSelected] = useState<Credential | null>(null);

  const types = useMemo(
    () => ['All', ...Array.from(new Set(allCredentials.map((c) => c.type)))],
    []
  );

  const organizations = useMemo(
    () => ['All', ...Array.from(new Set(allCredentials.map((c) => c.issuingOrganization))).sort()],
    []
  );

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const rows = allCredentials.filter((c) => {
      if (typeFilter !== 'All' && c.type !== typeFilter) return false;
      if (orgFilter !== 'All' && c.issuingOrganization !== orgFilter) return false;
      if (!term) return true;

      const haystack = [
        c.credentialName,
        c.issuingOrganization,
        c.description,
        ...c.skills,
      ]
        .join(' ')
        .toLowerCase();

      return haystack.includes(term);
    });

    const sorted = [...rows].sort((a, b) => {
      let comparison = 0;
      if (sortKey === 'issueDate') {
        comparison = a.issueDate.localeCompare(b.issueDate);
      } else {
        comparison = a[sortKey].localeCompare(b[sortKey]);
      }
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [searchTerm, typeFilter, orgFilter, sortKey, sortDirection]);

  const handleSort = (key: SortKey) => {
    if (key === sortKey) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  const sortIndicator = (key: SortKey) => {
    if (sortKey !== key) return '';
    return sortDirection === 'asc' ? ' ▲' : ' ▼';
  };

  return (
    <div className="page-content credentials-page">
      <h2>Credentials</h2>
      <p className="credentials-intro">
        A running record of degrees, certifications, and specializations I've earned. Click the
        thumbnail on any row to view the full certificate or diploma.
      </p>

      <div className="credentials-controls">
        <input
          type="search"
          className="credentials-search"
          placeholder="Search by name, org, or skill..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          aria-label="Search credentials"
        />

        <label className="credentials-filter-label">
          Type:
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            aria-label="Filter by credential type"
          >
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </label>

        <label className="credentials-filter-label">
          Issuer:
          <select
            value={orgFilter}
            onChange={(e) => setOrgFilter(e.target.value)}
            aria-label="Filter by issuing organization"
          >
            {organizations.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </label>

        {(searchTerm || typeFilter !== 'All' || orgFilter !== 'All') && (
          <button
            type="button"
            className="credentials-clear-btn"
            onClick={() => {
              setSearchTerm('');
              setTypeFilter('All');
              setOrgFilter('All');
            }}
          >
            Clear filters
          </button>
        )}
      </div>

      <p className="credentials-count">
        Showing {filtered.length} of {allCredentials.length} credentials
      </p>

      <div className="credentials-table-wrapper">
        <table className="credentials-table">
          <thead>
            <tr>
              <th scope="col" className="credentials-icon-col">
                Certificate
              </th>
              <th scope="col" className="sortable" onClick={() => handleSort('credentialName')}>
                Credential{sortIndicator('credentialName')}
              </th>
              <th scope="col" className="sortable" onClick={() => handleSort('issuingOrganization')}>
                Issuing Organization{sortIndicator('issuingOrganization')}
              </th>
              <th scope="col" className="sortable" onClick={() => handleSort('issueDate')}>
                Issue Date{sortIndicator('issueDate')}
              </th>
              <th scope="col">Skills</th>
              <th scope="col">Description</th>
              <th scope="col">Est. Time Commitment</th>
              <th scope="col">Link</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr key={c.id}>
                <td className="credentials-icon-col">
                  <button
                    type="button"
                    className="credentials-thumb-btn"
                    onClick={() => setSelected(c)}
                    aria-label={`Enlarge ${c.credentialName} certificate`}
                  >
                    <img src={c.thumbnail} alt={`${c.credentialName} certificate thumbnail`} />
                  </button>
                </td>
                <td>
                  <strong>{c.credentialName}</strong>
                  {isExpired(c.expirationDate) && <span className="credentials-badge">Expired</span>}
                </td>
                <td>{c.issuingOrganization}</td>
                <td>{formatDate(c.issueDate)}</td>
                <td>
                  <div className="credentials-skills">
                    {c.skills.map((skill) => (
                      <span key={skill} className="credentials-skill-chip">
                        {skill}
                      </span>
                    ))}
                  </div>
                </td>
                <td className="credentials-description-cell">{c.description}</td>
                <td>{c.estimatedTimeCommitment}</td>
                <td>
                  {c.credentialUrl ? (
                    <a href={c.credentialUrl} target="_blank" rel="noopener noreferrer">
                      Verify
                    </a>
                  ) : (
                    <span className="credentials-no-link">&mdash;</span>
                  )}
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={8} className="credentials-empty">
                  No credentials match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selected && (
        <div
          className="credentials-modal-overlay"
          onClick={() => setSelected(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${selected.credentialName} certificate`}
        >
          <div className="credentials-modal" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              className="credentials-modal-close"
              onClick={() => setSelected(null)}
              aria-label="Close"
            >
              &times;
            </button>
            <img src={selected.fullImage} alt={`${selected.credentialName} certificate`} />
            <div className="credentials-modal-details">
              <h3>{selected.credentialName}</h3>
              <p>
                <strong>{selected.issuingOrganization}</strong> &middot; {formatDate(selected.issueDate)}
              </p>
              <p>{selected.description}</p>
              {selected.credentialUrl && (
                <a href={selected.credentialUrl} target="_blank" rel="noopener noreferrer">
                  Verify credential &rarr;
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Credentials;
