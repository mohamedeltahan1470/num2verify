export const MongoDB_idToid = (schema) => {
    schema.method('toJSON', function() {
        const { _id, ...object } = this.toObject();
        object.id = _id;
        return object;
      });
}

