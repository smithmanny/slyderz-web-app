"use client";

import { useCallback, useState } from "react";

import { Button } from "app/components/ui/button";
import { Dialog, DialogTrigger } from "app/components/ui/dialog";
import DishModalCreateForm from "./DishModalCreateForm";

export default function CreateDishButton() {
	const [openModal, setModalOpen] = useState<boolean>(false);
	const closeModal = useCallback(() => setModalOpen(false), []);

	return (
		<Dialog open={openModal} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>
				<Button>Create Dish</Button>
			</DialogTrigger>

			{openModal && <DishModalCreateForm closeModal={closeModal} />}
		</Dialog>
	);
}
