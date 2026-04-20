class TestDataEmptyArray(object):
    @staticmethod
    def get_array():
        return []

class TestDataUniqueValues(object):
    @staticmethod
    def get_array():
        return [5, 2, 8]

    @staticmethod
    def get_expected_result():
        return 1

class TestDataExactlyTwoDifferentMinimums(object):
    @staticmethod
    def get_array():
        return [1, 1, 3]

    @staticmethod
    def get_expected_result():
        return 0