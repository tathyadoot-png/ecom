import { Button } from '@/components/ui/Button';

interface ProfileActionsProps {
  isSaving: boolean;
  hasChanges: boolean;
  onSave: () => void;
  onCancel: () => void;
  saveLabel?: string;
}

// Shared Save/Cancel pair for every editable section on the profile
// page (ProfileInfo, AddressForm, SecuritySection) — same
// disabled-while-saving / disabled-until-dirty behavior in one place.
const ProfileActions = ({
  isSaving,
  hasChanges,
  onSave,
  onCancel,
  saveLabel = 'Save Changes',
}: ProfileActionsProps) => {
  return (
    <div className="flex items-center gap-3">
      <Button
        variant="primary"
        size="small"
        isLoading={isSaving}
        disabled={!hasChanges}
        onClick={onSave}
      >
        {isSaving ? 'Saving...' : saveLabel}
      </Button>
      <Button variant="ghost" size="small" disabled={isSaving || !hasChanges} onClick={onCancel}>
        Cancel
      </Button>
    </div>
  );
};

export { ProfileActions };
