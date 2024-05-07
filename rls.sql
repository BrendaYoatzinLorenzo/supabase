-- activar RLS sobre Exercises
alter table Exercises enable row level security

-- politica de lectura
create policy "Solo los usuarios verificados pueden ver Exercises"
on Exercises for select
to authenticated
using ( true );

create policy "Solo los usuarios verificados pueden actualizar Exercises"
on Exercises for UPDATE
to authenticated
using ( true );

create policy "Solo los usuarios verificados pueden eliminar Exercises"
on Exercises for DELETE
to authenticated
using ( true );

create policy "Solo los usuarios verificados pueden crear Exercises"
on Exercises for INSERT
to authenticated
WITH CHECk ( true );