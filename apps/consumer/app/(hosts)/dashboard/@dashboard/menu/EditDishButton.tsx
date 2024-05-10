"use client";

import { useQuery } from "@tanstack/react-query";
import { type FC, type PropsWithChildren, useCallback, useState } from "react";

import getMenuDishQuery from "app/actions/queries/getMenuDish";
import { Button } from "app/components/ui/button";
import { Dialog, DialogTrigger } from "app/components/ui/dialog";
import DishModalUpdateForm from "./DishModalUpdateForm";

type ComponentWithChildrenProps = PropsWithChildren<{ dishId: string }>;
const EditDishButton: FC<ComponentWithChildrenProps> = (props) => {
	const [openModal, setModalOpen] = useState<boolean>(false);
	const closeModal = useCallback(() => setModalOpen(false), []);
	const {
		data: dish,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["dashboard-menu-dish", props.dishId],
		queryFn: async () => await getMenuDishQuery({ dishId: props.dishId }),
	});

	if (isLoading || isError || !dish) return null;

	return (
		<Dialog open={openModal} onOpenChange={setModalOpen}>
			<DialogTrigger asChild>
				<Button variant="link" className="text-black">
					{props.children}
				</Button>
			</DialogTrigger>

			{openModal && <DishModalUpdateForm closeModal={closeModal} dish={dish} />}
		</Dialog>
	);
};

export default EditDishButton;
