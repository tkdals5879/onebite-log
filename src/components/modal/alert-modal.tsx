import { useAlertModal } from "@/store/alert-modal";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "../ui/alert-dialog";

export default function AlertModal() {

    const store = useAlertModal();
    if (!store.isOpen) return null;

    const handleCancelClick = () => {
        if (store.onNegative) store.onNegative();
        store.actions.close();
    };

    const handleActionsClick = () => {
        if (store.onPositive) store.onPositive();
        store.actions.close();
    };

    return <AlertDialog open={store.isOpen}>
        <AlertDialogContent>
            <AlertDialogHeader className="flex flex-col items-center gap-4">
                <AlertDialogTitle>{store.title}</AlertDialogTitle>
                <AlertDialogDescription>{store.description}</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel className="flex-1" onClick={handleCancelClick}>취소</AlertDialogCancel>
                <AlertDialogAction className="flex-1" onClick={handleActionsClick}>확인</AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
}