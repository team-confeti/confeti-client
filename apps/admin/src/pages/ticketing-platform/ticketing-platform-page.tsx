import { useState } from 'react';
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from '@tanstack/react-query';
import { Plus, Ticket, Trash2, Upload, X } from 'lucide-react';

import { TICKET_VENDOR_MUTATION_OPTIONS } from '@shared/apis/ticket-vendor-mutations';
import { TICKET_VENDOR_QUERY_OPTIONS } from '@shared/apis/ticket-vendor-queries';
import { Button, EmptyState } from '@shared/components/common';
import { TICKET_VENDOR_QUERY_KEY } from '@shared/constants/query-key';
import type { TicketVendorResponse } from '@shared/types/api';
import { fileToBase64, validateLogoFile } from '@shared/utils';
import { adminToast } from '@shared/utils/admin-toast';

import * as styles from './ticketing-platform-page.css';

type FormMode = 'create' | 'edit';

const TicketingPlatformPage = () => {
  const queryClient = useQueryClient();
  const { data } = useSuspenseQuery(TICKET_VENDOR_QUERY_OPTIONS.LIST());
  const ticketVendors = data.ticketVendors;

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('create');
  const [editingTicketingPlatform, setEditingTicketingPlatform] =
    useState<TicketVendorResponse | null>(null);
  const [ticketingPlatformName, setTicketingPlatformName] = useState('');
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoFile, setLogoFile] = useState<File | null>(null);

  const handleOpenCreateForm = () => {
    setIsFormOpen(true);
    setFormMode('create');
    setEditingTicketingPlatform(null);
    setTicketingPlatformName('');
    setLogoPreview(null);
    setLogoFile(null);
  };

  const handleOpenEditForm = (ticketVendor: TicketVendorResponse) => {
    setIsFormOpen(true);
    setFormMode('edit');
    setEditingTicketingPlatform(ticketVendor);
    setTicketingPlatformName(ticketVendor.name);
    setLogoPreview(ticketVendor.logoPath || null);
    setLogoFile(null);
  };

  const handleCloseForm = () => {
    setIsFormOpen(false);
    setFormMode('create');
    setEditingTicketingPlatform(null);
    setTicketingPlatformName('');
    setLogoPreview(null);
    setLogoFile(null);
  };

  const { mutate: postMutate } = useMutation(
    TICKET_VENDOR_MUTATION_OPTIONS.POST_TICKET_VENDOR(),
  );

  const { mutate: patchMutate } = useMutation(
    TICKET_VENDOR_MUTATION_OPTIONS.PATCH_TICKET_VENDOR(),
  );

  const { mutate: deleteMutate } = useMutation(
    TICKET_VENDOR_MUTATION_OPTIONS.DELETE_TICKET_VENDOR(),
  );

  const invalidateTicketVendors = () => {
    queryClient.invalidateQueries({ queryKey: TICKET_VENDOR_QUERY_KEY.ALL });
  };

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 유효성 검사
    const validation = validateLogoFile(file);
    if (!validation.isValid) {
      adminToast.error({
        text: validation.error ?? '유효하지 않은 파일입니다.',
      });
      return;
    }

    // 파일을 Base64로 변환
    try {
      const base64 = await fileToBase64(file);
      setLogoPreview(base64);
      setLogoFile(file);
    } catch {
      adminToast.error({ text: '파일 업로드에 실패했습니다.' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formMode === 'create') {
      if (!logoFile) {
        adminToast.error({ text: '로고 이미지를 업로드해주세요.' });
        return;
      }
      postMutate(
        { name: ticketingPlatformName, logoImage: logoFile },
        {
          onSuccess: () => {
            invalidateTicketVendors();
            handleCloseForm();
          },
        },
      );
    } else {
      if (!editingTicketingPlatform) return;
      patchMutate(
        {
          ticketVendorId: editingTicketingPlatform.id,
          request: {
            name: ticketingPlatformName,
            ...(logoFile && { logoImage: logoFile }),
          },
        },
        {
          onSuccess: () => {
            invalidateTicketVendors();
            handleCloseForm();
          },
        },
      );
    }
  };

  const handleDelete = (ticketVendorId: number) => {
    deleteMutate(ticketVendorId, {
      onSuccess: invalidateTicketVendors,
    });
  };

  const handleTicketingPlatformDoubleClick = (
    ticketVendor: TicketVendorResponse,
  ) => {
    // 추가 폼이 열려있으면 입력 정보만 초기화하고 폼 닫기
    if (isFormOpen && formMode === 'create') {
      handleCloseForm();
      return;
    }
    // 편집 폼이 열려있거나 폼이 닫혀있으면 편집 폼 열기
    handleOpenEditForm(ticketVendor);
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

      {ticketVendors.length === 0 && !isFormOpen ? (
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
                    id="ticketing-platform-name"
                    value={ticketingPlatformName}
                    onChange={(e) => setTicketingPlatformName(e.target.value)}
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
          {ticketVendors.map((ticketVendor) => (
            <div
              key={ticketVendor.id}
              onDoubleClick={() =>
                handleTicketingPlatformDoubleClick(ticketVendor)
              }
              className={styles.card}
            >
              <div className={styles.cardLogo}>
                {ticketVendor.logoPath ? (
                  <img
                    src={ticketVendor.logoPath}
                    alt={ticketVendor.name}
                    className={styles.cardLogoImage}
                  />
                ) : (
                  <Ticket size={32} />
                )}
              </div>
              <h3 className={styles.cardTitle}>{ticketVendor.name}</h3>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(ticketVendor.id);
                }}
                className={styles.closeButton}
                type="button"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TicketingPlatformPage;
