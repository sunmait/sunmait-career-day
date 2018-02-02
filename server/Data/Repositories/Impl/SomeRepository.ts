class SomeRepository extends RepositoryBase<SomeEntity>
  implements ISomeRepository {
  constructor(/*db context or connection object*/) {
    super(/*db context or connection object*/);
  }

  // specific methods
}
