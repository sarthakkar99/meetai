import { ResponsiveDialog } from "@/components/responsive-dialog";
import { AgentForm } from "./agents-form";
interface NewAgentDialogProps {
    open: boolean,
    onOpenChange: (open : boolean) => void;
};

export const NewAgentDialog = ({open, onOpenChange}: NewAgentDialogProps) => {
    return (
    <ResponsiveDialog title="new agent" description="create new agent" open = {open} onOpenChange={onOpenChange}>
        new agent form
    
    <AgentForm 
    onSuccess = {() => onOpenChange(false)}
    onCancel = {() => onOpenChange(false)}
    />
    </ResponsiveDialog>
    );
}