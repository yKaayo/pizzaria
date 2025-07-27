select p.id,
       p.name,
       p.quantity,
       i.path
  from pizzas p
  left join images i
on p.id = i.pizzaid