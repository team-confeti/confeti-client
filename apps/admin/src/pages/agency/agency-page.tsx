import { useState } from 'react';
import { Plus, Ticket, Upload, X } from 'lucide-react';

import { Button, EmptyState } from '@shared/components/common';
import { AGENCIES } from '@shared/mocks';
import type { Agency } from '@shared/types';
import { fileToBase64, validateLogoFile } from '@shared/utils';

import * as styles from './agency-page.css';

type FormMode = 'create' | 'edit';

const AgencyPage = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [editingAgency, setEditingAgency] = useState<Agency | null>(null);
  const [agencyName, setAgencyName] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleOpenCreateForm = () => {
    setIsFormOpen(true);
    setFormMode('create');
    setEditingAgency(null);
    setAgencyName('');
    setLogoPreview(null);
  };

  const handleOpenEditForm = (agency: Agency) => {
    setIsFormOpen(true);
    setFormMode('edit');
    setEditingAgency(agency);
    setAgencyName(agency.name);
    setLogoPreview(agency.logoUrl || null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setFormMode('create');
    setEditingAgency(null);
    setAgencyName('');
    setLogoPreview(null);
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 유효성 검사
    const validation = validateLogoFile(file);
    if (!validation.isValid) {
      alert(validation.error);
      return;
    }

    // 파일을 Base64로 변환
    try {
      const base64 = await fileToBase64(file);
      setLogoPreview(base64);
    } catch {
      alert('파일 업로드에 실패했습니다.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formMode === 'create') {
      // TODO: Implement actual agency creation logic
      console.log('Creating agency:', { name: agencyName, logo: logoPreview });
    } else {
      // TODO: Implement actual agency update logic
      console.log('Updating agency:', {
        id: editingAgency?.id,
        name: agencyName,
        logo: logoPreview,
      });
    }
    handleCloseForm();
  };

  const handleAgencyDoubleClick = (agency: Agency) => {
    // 추가 폼이 열려있으면 입력 정보만 초기화하고 폼 닫기
    if (isFormOpen && formMode === 'create') {
      handleCloseForm();
      return;
    }
    // 편집 폼이 열려있거나 폼이 닫혀있으면 편집 폼 열기
    handleOpenEditForm(agency);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>예매처 관리</h2>
          <p className={styles.subtitle}>
            공연 등록 시 사용할 예매처 목록을 관리합니다.
          </p>
        </div>
        <Button
          onClick={handleOpenCreateForm}
          leftIcon={<Plus size={16} />}
          className={styles.createButton}
        >
          예매처 추가
        </Button>
      </div>

      {AGENCIES.length === 0 && !isFormOpen ? (
        <EmptyState
          icon={<Ticket size={48} />}
          title="등록된 예매처가 없습니다."
        />
      ) : (
        <div className={styles.grid}>
          {isFormOpen && (
            <div className={styles.formCard}>
              <div className={styles.modalHeader}>
                <h3 className={styles.modalTitle}>
                  {formMode === 'create' ? '새 예매처 등록' : '예매처 수정'}
                </h3>
                <Button
                  onClick={handleCloseForm}
                  variant="ghost"
                  size="small"
                  className={styles.closeButton}
                  type="button"
                >
                  <X size={20} />
                </Button>
              </div>
              <form onSubmit={handleSubmit} className={styles.modalContent}>
                <div className={styles.formRow}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className={styles.fileInput}
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className={styles.logoUploadBox}>
                    {logoPreview ? (
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className={styles.logoPreview}
                      />
                    ) : (
                      <>
                        <Upload size={16} className={styles.uploadIcon} />
                        <span className={styles.uploadText}>로고</span>
                      </>
                    )}
                  </label>
                  <input
                    type="text"
                    id="agency-name"
                    value={agencyName}
                    onChange={(e) => setAgencyName(e.target.value)}
                    placeholder="예매처 이름 (예: 인터파크)"
                    className={styles.input}
                    required
                  />
                </div>
                <Button type="submit" className={styles.submitButton}>
                  {formMode === 'create' ? '등록' : '수정'}
                </Button>
              </form>
            </div>
          )}
          {AGENCIES.map((agency) => (
            <div
              key={agency.id}
              onDoubleClick={() => handleAgencyDoubleClick(agency)}
              className={styles.card}
            >
              <div className={styles.cardLogo}>
                {agency.logoUrl ? (
                  <img
                    src={agency.logoUrl}
                    alt={agency.name}
                    className={styles.cardLogoImage}
                  />
                ) : (
                  <Ticket size={32} />
                )}
              </div>
              <h3 className={styles.cardTitle}>{agency.name}</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgencyPage;
