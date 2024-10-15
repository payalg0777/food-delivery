import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';

export class UpdateCartDto extends PartialType(CreateCartDto) {}

// Id
// User_id
// restaurant_id
// menu_id
// menu_items
// created_at
// updated_at
